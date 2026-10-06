@echo off
title My Portfolio - http://localhost:5173
echo ============================================
echo  Serving your portfolio at:
echo  http://localhost:5173
echo  Keep this window open. Press Ctrl+C to stop.
echo ============================================
cd /d "%~dp0"
python -m http.server 5173
pause
