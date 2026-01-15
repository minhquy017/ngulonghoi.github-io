@echo off
chcp 65001 > nul
color 0A
cls
echo ===================================================
echo     CONG CU CAP NHAT WEBSITE TINH TU DONG
echo     (HueUni Connect Auto Update Tool)
echo ===================================================
echo.
echo Dang kiem tra trang thai Git...
echo.

git status
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo LOI: Thu muc nay chua duoc khoi tao Git hoac chua cai Git!
    echo Vui long xem lai huong dan trong DEPLOY.md
    pause
    exit /b
)

echo.
echo Dang them cac file thay doi (git add)...
git add .

echo.
echo ---------------------------------------------------
set /p commit_msg="Nhap noi dung ban da thay doi (VD: Sua loi nut bam): "

if "%commit_msg%"=="" set commit_msg="Cap nhat code moi"

echo.
echo Dang luu thay doi (git commit)...
git commit -m "%commit_msg%"

echo.
echo Dang day len GitHub (git push)...
git push

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ===================================================
    echo      CAP NHAT THANH CONG! (SUCCESS)
    echo ===================================================
    echo Website se duoc GitHub Pages cap nhat sau 1-2 phut.
    echo Hay doi mot chut roi F5 trang web nhe!
) else (
    echo.
    echo ===================================================
    echo      CO LOI XAY RA! (ERROR)
    echo ===================================================
    echo Khong the day code len GitHub. Hay kiem tra ket noi internet
    echo hoac xem ban da cau hinh git remote dung chua.
)

echo.
pause
