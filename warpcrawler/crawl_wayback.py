import os
import re
import sys
import time
import queue
import shutil
import urllib.parse
from typing import Optional, Set, Tuple

try:
    import requests
except Exception as exc:  # Fallback helpful error
    print("This script requires the 'requests' package. Please install it: pip install requests", file=sys.stderr)
    raise


SNAPSHOT_TIMESTAMP = "20250408214013"
WAYBACK_PREFIX = f"https://web.archive.org/web/{SNAPSHOT_TIMESTAMP}"


def ensure_directory_for_file(path: str) -> None:
    directory = os.path.dirname(path)
    if directory and not os.path.exists(directory):
        os.makedirs(directory, exist_ok=True)


def normalize_archived_url(url: str) -> Optional[str]:
    if not url:
        return None
    # Accept fully-qualified archived URLs or relative /web/... paths
    if url.startswith("//web.archive.org/"):
        return "https:" + url
    if url.startswith("/web/"):
        return "https://web.archive.org" + url
    if url.startswith("https://web.archive.org/web/"):
        return url
    # Accept already absolute snapshot links that start with our timestamp (sometimes html contains without protocol)
    if url.startswith(WAYBACK_PREFIX):
        return url
    return None


def extract_original_url(archived_url: str) -> Optional[str]:
    # Patterns like:
    # https://web.archive.org/web/20250408214013/https://jamstash.io/
    # https://web.archive.org/web/20250408214013im_/https://jamstash.io/assets/logo.png
    m = re.match(r"^https?://web\.archive\.org/web/\d{14}[a-z_\-]*/(https?://.+)$", archived_url)
    if not m:
        return None
    return m.group(1)


def is_in_snapshot(archived_url: str) -> bool:
    return archived_url.startswith(WAYBACK_PREFIX)


def guess_local_path(root_dir: str, original_url: str, content_type: Optional[str]) -> str:
    parsed = urllib.parse.urlparse(original_url)
    host = parsed.netloc
    path = parsed.path
    if not path or path.endswith("/"):
        path = (path or "/") + "index.html"
    # Ensure extension for html when missing
    _, ext = os.path.splitext(path)
    if not ext:
        if content_type and "text/html" in content_type:
            path = path + ".html"
    local_path = os.path.join(root_dir, host, path.lstrip("/"))
    return local_path


def find_links_to_follow(html: str) -> Set[str]:
    found: Set[str] = set()

    # href/src/data-src
    attr_pattern = re.compile(r"\b(?:href|src|data-src|data-href)\s*=\s*([\"'])(.*?)\1", re.IGNORECASE)
    for _, val in attr_pattern.findall(html):
        u = normalize_archived_url(val)
        if u and is_in_snapshot(u):
            found.add(u)

    # srcset: split by commas -> each part like "url w"
    srcset_pattern = re.compile(r"\bsrcset\s*=\s*([\"'])(.*?)\1", re.IGNORECASE | re.DOTALL)
    for _, val in srcset_pattern.findall(html):
        for part in val.split(','):
            url_part = part.strip().split(' ')[0]
            u = normalize_archived_url(url_part)
            if u and is_in_snapshot(u):
                found.add(u)

    # CSS url(...) inside style tags or inline styles
    css_url_pattern = re.compile(r"url\(\s*([\"']?)(.+?)(\1)\s*\)")
    for _, val, _ in css_url_pattern.findall(html):
        u = normalize_archived_url(val)
        if u and is_in_snapshot(u):
            found.add(u)

    return found


def fetch(archived_url: str, session: requests.Session) -> Tuple[Optional[bytes], Optional[str]]:
    try:
        r = session.get(archived_url, timeout=30)
        if r.status_code == 200:
            return r.content, r.headers.get('Content-Type')
        # Accept 404 as terminal
        return None, None
    except Exception:
        return None, None


def crawl(start_archived_url: str, out_dir: str) -> None:
    if os.path.exists(out_dir):
        # keep existing directory but proceed (resume-like)
        pass
    else:
        os.makedirs(out_dir, exist_ok=True)

    visited: Set[str] = set()
    q: queue.Queue[str] = queue.Queue()

    normalized_start = normalize_archived_url(start_archived_url) or start_archived_url
    if not is_in_snapshot(normalized_start):
        print("Start URL is not within the required snapshot timestamp.", file=sys.stderr)
        sys.exit(1)
    q.put(normalized_start)

    session = requests.Session()
    session.headers.update({
        "User-Agent": "JamstashCrawler/1.0 (+local)"
    })

    while not q.empty():
        current = q.get()
        if current in visited:
            continue
        visited.add(current)

        content, content_type = fetch(current, session)
        if content is None:
            continue

        original_url = extract_original_url(current)
        if not original_url:
            # If we cannot map to original, skip saving but still attempt to discover links from HTML
            original_url = current

        local_path = guess_local_path(out_dir, original_url, content_type)
        ensure_directory_for_file(local_path)

        # For HTML, also rewrite links to local relative paths for offline viewing
        if content_type and 'text/html' in content_type:
            try:
                html_text = content.decode('utf-8', errors='ignore')
            except Exception:
                html_text = ''

            links = find_links_to_follow(html_text)

            # Enqueue discovered links first
            for link in links:
                if link not in visited and is_in_snapshot(link):
                    q.put(link)

            # Build replacement map: archived url -> relative path from current file
            replacements: dict[str, str] = {}
            current_dir = os.path.dirname(local_path) or '.'
            for link in links:
                orig = extract_original_url(link)
                if not orig:
                    continue
                target_local = guess_local_path(out_dir, orig, None)
                rel = os.path.relpath(target_local, start=current_dir)
                replacements[link] = rel.replace('\\', '/')

            # Replace occurrences in HTML
            rewritten = html_text
            for archived_link, rel_path in replacements.items():
                rewritten = rewritten.replace(archived_link, rel_path)

            with open(local_path, 'wb') as f:
                f.write(rewritten.encode('utf-8'))
        else:
            with open(local_path, 'wb') as f:
                f.write(content)

        # Be gentle
        time.sleep(0.1)


def main() -> None:
    if len(sys.argv) < 3:
        print("Usage: python scripts/crawl_wayback.py <snapshot_url> <output_dir>")
        sys.exit(1)
    start_url = sys.argv[1]
    out_dir = sys.argv[2]
    crawl(start_url, out_dir)


if __name__ == "__main__":
    main()


