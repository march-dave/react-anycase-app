#!/bin/bash

# CalorieFit AAB 빌드 스크립트

set -e

echo "==================================="
echo "CalorieFit AAB Build Script"
echo "==================================="
echo ""

# 현재 디렉토리 확인
if [ ! -f "package.json" ]; then
    echo "Error: Please run this script from the project root directory"
    exit 1
fi

# Node modules 설치 (필요한 경우)
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Android 디렉토리로 이동
cd android

# 클린 빌드
echo "Cleaning previous builds..."
./gradlew clean || gradle clean

# Release AAB 빌드
echo "Building release AAB..."
./gradlew bundleRelease || gradle bundleRelease

# AAB 파일 위치
AAB_FILE="app/build/outputs/bundle/release/app-release.aab"

if [ -f "$AAB_FILE" ]; then
    echo ""
    echo "==================================="
    echo "Build successful!"
    echo "==================================="
    echo ""
    echo "AAB file location:"
    echo "$(pwd)/$AAB_FILE"

    # AAB_Builds 폴더로 복사
    cd ..
    mkdir -p AAB_Builds

    # 날짜 포함한 파일명으로 복사
    TIMESTAMP=$(date +%Y%m%d_%H%M%S)
    cp "android/$AAB_FILE" "AAB_Builds/CalorieFit_${TIMESTAMP}.aab"

    echo ""
    echo "AAB file copied to:"
    echo "AAB_Builds/CalorieFit_${TIMESTAMP}.aab"
    echo ""
    echo "Keystore info:"
    echo "  - Password: 654321"
    echo "  - Alias: caloriefit-key-alias"
    echo ""
else
    echo ""
    echo "Error: AAB file not found!"
    echo "Please check the build output for errors."
    exit 1
fi
