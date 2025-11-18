#!/bin/bash

# AAB 빌드 스크립트
# Release AAB 파일을 빌드하고 AAB_Builds 폴더로 복사합니다

set -e

echo "🔨 Building Release AAB..."

# AAB_Builds 디렉토리 생성
mkdir -p AAB_Builds

# Gradle을 사용하여 AAB 빌드
cd android
./gradlew clean
./gradlew bundleRelease

# AAB 파일 복사
AAB_FILE=$(find app/build/outputs/bundle/release -name "*.aab" | head -n 1)

if [ -f "$AAB_FILE" ]; then
    TIMESTAMP=$(date +%Y%m%d_%H%M%S)
    DEST_FILE="../AAB_Builds/CalorieWorkoutApp_${TIMESTAMP}.aab"
    
    cp "$AAB_FILE" "$DEST_FILE"
    
    echo "✅ AAB build successful!"
    echo "📦 File saved to: $DEST_FILE"
    
    # 파일 크기 출력
    FILE_SIZE=$(du -h "$DEST_FILE" | cut -f1)
    echo "📏 File size: $FILE_SIZE"
else
    echo "❌ AAB file not found!"
    exit 1
fi
