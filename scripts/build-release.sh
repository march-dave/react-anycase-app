#!/bin/bash

# 릴리스 빌드 스크립트
# .aab 파일을 생성하고 AAB_Builds 폴더로 복사

echo "Starting release build..."

# Navigate to android directory
cd "$(dirname "$0")/../android"

# Download gradle wrapper if not exists
if [ ! -f "gradle/wrapper/gradle-wrapper.jar" ]; then
    echo "Downloading gradle wrapper..."
    gradle wrapper --gradle-version 8.10.2
fi

# Clean previous builds
echo "Cleaning previous builds..."
./gradlew clean

# Build release AAB
echo "Building release AAB..."
./gradlew bundleRelease

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "Build successful!"

    # Copy AAB to AAB_Builds folder
    AAB_SOURCE="app/build/outputs/bundle/release/app-release.aab"
    AAB_DEST="../AAB_Builds/CalorieWorkout-release-$(date +%Y%m%d-%H%M%S).aab"

    if [ -f "$AAB_SOURCE" ]; then
        cp "$AAB_SOURCE" "$AAB_DEST"
        echo "AAB file copied to: $AAB_DEST"

        # Also copy to latest
        cp "$AAB_SOURCE" "../AAB_Builds/CalorieWorkout-latest.aab"
        echo "Latest AAB copied to: ../AAB_Builds/CalorieWorkout-latest.aab"
    else
        echo "Error: AAB file not found at $AAB_SOURCE"
        exit 1
    fi
else
    echo "Build failed!"
    exit 1
fi

echo "Build process completed!"
