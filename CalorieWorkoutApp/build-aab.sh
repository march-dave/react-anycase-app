#!/bin/bash

# Calorie Workout App - AAB 빌드 스크립트
# 이 스크립트는 Release AAB 파일을 생성하고 AAB_Builds 폴더에 복사합니다.

set -e  # 에러 발생 시 즉시 중단

echo "======================================"
echo "  Calorie Workout App - AAB Builder"
echo "======================================"
echo ""

# 프로젝트 루트 디렉토리로 이동
cd "$(dirname "$0")"

echo "1. Cleaning previous builds..."
cd android
./gradlew clean

echo ""
echo "2. Building Release AAB..."
./gradlew bundleRelease

echo ""
echo "3. Verifying AAB file..."
AAB_FILE="app/build/outputs/bundle/release/app-release.aab"
if [ -f "$AAB_FILE" ]; then
    echo "✓ AAB file generated successfully!"
    echo "  Location: android/$AAB_FILE"

    # 파일 크기 확인
    SIZE=$(du -h "$AAB_FILE" | cut -f1)
    echo "  Size: $SIZE"
else
    echo "✗ AAB file not found!"
    exit 1
fi

echo ""
echo "4. Copying AAB to AAB_Builds folder..."
cd ..
mkdir -p AAB_Builds

# 타임스탬프가 포함된 파일명으로 복사
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
DEST_FILE="AAB_Builds/calorieworkoutapp-${TIMESTAMP}.aab"
cp "android/$AAB_FILE" "$DEST_FILE"

echo "✓ AAB file copied to: $DEST_FILE"

echo ""
echo "======================================"
echo "  Build Complete!"
echo "======================================"
echo ""
echo "Release AAB file:"
echo "  $DEST_FILE"
echo ""
echo "You can now upload this AAB file to Google Play Console."
echo ""
