@echo off
setlocal
cd /d %~dp0

git config user.email "dexstar1@users.noreply.github.com"
git config user.name "dexstar1"

git add jamstash_snapshot/jamstash.io/
git commit -m "Add jamstash.io mirrored site from Wayback Machine"
git branch -M main
git push -u origin main

echo Done! Only jamstash.io site pushed to https://github.com/dexstar1/jamstash
endlocal
