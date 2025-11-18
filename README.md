# Calorie Workout Calculator

A React Native Android app that calculates calories from food photos and recommends workout time.

## Features

- 📸 Take photos of food
- 🔢 Calculate estimated calories
- 💪 Get recommended workout time to burn calories
- 📱 Android-only support
- 🎯 Target SDK Version 35

## Requirements

- Node.js >= 18
- React Native 0.78.2
- Android SDK with API Level 35
- JDK 17 or higher

## Installation

```bash
# Install dependencies
npm install

# or using yarn
yarn install
```

## Running the App

```bash
# Start Metro bundler
npm start

# Run on Android device/emulator
npm run android
```

## Building for Production

### Build AAB (Android App Bundle)

```bash
# Build release AAB
npm run build:android
```

The AAB file will be generated in the `AAB_Builds` folder.

### Release Configuration

- **Keystore**: `android/app/my-release-key.keystore`
- **Keystore Password**: `654321`
- **Key Alias**: `my-key-alias`
- **Key Password**: `654321`

## Project Structure

```
CalorieWorkoutCalculator/
├── android/              # Android native code
│   ├── app/
│   │   ├── build.gradle  # targetSdkVersion: 35
│   │   └── src/main/
│       └── build.gradle
├── App.tsx               # Main app component
├── index.js              # Entry point
├── package.json
└── AAB_Builds/           # Release AAB files
```

## Development Notes

- **Language**: UI text in English, code comments in Korean
- **Camera**: Uses react-native-vision-camera (to be configured)
- **Permissions**: Camera, Storage access required
- **Architecture**: Currently using old architecture (newArchEnabled=false)

## TODO

- [ ] Implement real camera functionality with react-native-vision-camera
- [ ] Integrate AI/ML model for calorie estimation
- [ ] Add database for food history
- [ ] Implement workout tracking
- [ ] Add user settings and preferences

## License

Private - All rights reserved

## Author

Developed for calorie tracking and workout planning
