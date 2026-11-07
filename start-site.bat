@echo off
title My Portfolio - Local Server
echo ============================================
echo  Starting your portfolio from this folder...
echo  Your browser will open automatically.
echo  Keep this window open. Press Ctrl+C to stop.
echo ============================================
cd /d "%~dp0"
python "%~dp0start_site.py"
if errorlevel 1 (
    echo.
    echo Could not start the portfolio server. Make sure Python is installed and available as "python".
)
pause
