# Calorie Workout App

A React Native application that calculates calories from food photos and suggests exercise time needed to burn those calories.

## Features

- 📸 Take photos of food using camera
- 🖼️ Select images from gallery
- 🔢 Calorie estimation (simulation)
- 🏃 Exercise time calculation (running, walking, cycling)
- 📱 Android-only support

## Technical Specifications

- **Framework**: React Native 0.78.2
- **Platform**: Android only
- **Target SDK**: 35
- **Language**: TypeScript
- **Testing**: Jest with React Native Testing Library

## Prerequisites

- Node.js >= 18
- JDK 17 or higher
- Android SDK with API Level 35
- Android Studio (recommended)

## Installation

1. Navigate to the project directory:
```bash
cd ~/Documents/react-native/CalorieWorkoutApp
```

2. Install dependencies:
```bash
npm install
```

3. Start Metro bundler:
```bash
npm start
```

4. Run on Android:
```bash
npm run android
```

## Building Release AAB

### Prerequisites
- Release keystore is already configured in `android/app/calorieworkoutapp-release.keystore`
- Keystore password: 654321

### Build Steps

1. Build the release bundle:
```bash
npm run build:android
```

2. Copy AAB to AAB_Builds folder:
```bash
npm run copy:aab
```

The generated AAB file will be located in:
- Build output: `android/app/build/outputs/bundle/release/app-release.aab`
- Copied to: `AAB_Builds/calorieworkoutapp-[timestamp].aab`

### Manual Build

```bash
cd android
./gradlew clean
./gradlew bundleRelease
```

The AAB file will be generated at:
`android/app/build/outputs/bundle/release/app-release.aab`

## Testing

Run all tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm test -- --watch
```

Run tests with coverage:
```bash
npm test -- --coverage
```

## Project Structure

```
CalorieWorkoutApp/
├── __tests__/              # Unit tests
│   ├── App.test.tsx
│   └── calorieCalculator.test.ts
├── android/                # Android native code
│   ├── app/
│   │   ├── src/main/
│   │   │   ├── java/com/calorieworkoutapp/
│   │   │   └── res/        # Android resources
│   │   ├── build.gradle
│   │   └── calorieworkoutapp-release.keystore
│   ├── build.gradle
│   ├── gradle.properties
│   └── settings.gradle
├── src/                    # Source code
│   └── utils/
│       └── calorieCalculator.ts
├── AAB_Builds/            # Release AAB files
├── App.tsx                # Main application component
├── index.js               # Entry point
├── package.json
└── README.md

```

## Android Permissions

The app requires the following permissions:
- `CAMERA` - To take photos
- `READ_EXTERNAL_STORAGE` - To read images from gallery
- `READ_MEDIA_IMAGES` - To read media images (Android 13+)

## Configuration

### Android Build Configuration

- **compileSdk**: 35
- **targetSdk**: 35
- **minSdk**: 26
- **buildTools**: 35.0.0

### Release Keystore

Location: `android/app/calorieworkoutapp-release.keystore`
- Alias: `calorieworkoutapp-key-alias`
- Store Password: `654321`
- Key Password: `654321`

## Architecture

### Calorie Calculation

The app currently uses a simulation for calorie estimation. In a production environment, this should be replaced with:
- Google Cloud Vision API
- AWS Rekognition
- Custom ML model
- Specialized food recognition API

### Exercise Time Calculation

Exercise time is calculated based on average calorie burn rates:
- Running: ~10 kcal/minute
- Walking: ~5 kcal/minute
- Cycling: ~8 kcal/minute

## Development

### Available Scripts

- `npm start` - Start Metro bundler
- `npm run android` - Run on Android device/emulator
- `npm test` - Run unit tests
- `npm run lint` - Run ESLint
- `npm run build:android` - Build release AAB
- `npm run copy:aab` - Copy AAB to AAB_Builds folder

## Future Enhancements

- [ ] Integrate real AI-based food recognition API
- [ ] Add food history tracking
- [ ] Implement daily calorie goals
- [ ] Add more exercise types
- [ ] Support for custom exercise profiles
- [ ] Offline mode with local database
- [ ] Social sharing features

## License

Private project - All rights reserved

## Support

For issues and questions, please contact the development team.
