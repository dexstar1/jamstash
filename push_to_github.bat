@echo off
setlocal
cd /d %~dp0

git config user.email "dexstar1@users.noreply.github.com"
git config user.name "dexstar1"

git add .
git commit -m "Initial commit: Mirrored jamstash.io from Wayback Machine snapshot"
git branch -M main
git push -u origin main

echo Done! Check https://github.com/dexstar1/jamstash
endlocal
