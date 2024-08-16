@echo off
$env:ORIGIN="http://172.20.10.2:3000"; node .\build\index.js

timeout /t 10 /nobreak >nul

cd backend

waitress-serve --listen 127.0.0.1:5000 gmailing:app

timeout /t 10 /nobreak >nul

