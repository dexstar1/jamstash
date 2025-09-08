@echo off
setlocal
cd /d %~dp0

if not exist .venv (
  py -3 -m venv .venv
)

call .venv\Scripts\activate.bat
python -m pip install --disable-pip-version-check -q requests

python crawl_wayback.py https://web.archive.org/web/20250408214013/https://jamstash.io/ jamstash_snapshot

if %errorlevel% neq 0 (
  echo Crawl failed with code %errorlevel%.
  exit /b %errorlevel%
)

echo Done. Open jamstash_snapshot\jamstash.io\index.html
endlocal

