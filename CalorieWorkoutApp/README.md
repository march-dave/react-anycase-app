# Calorie Workout App

A React Native application that calculates calories from food photos and recommends workout times to burn those calories.

## Features

- **Photo Analysis**: Take a photo of your food to estimate calories
- **Manual Entry**: Enter food names manually for calorie lookup
- **Workout Calculator**: See various workout options to burn calories
- **Calorie Database**: Contains 50+ common foods with calorie data

## Requirements

- Node.js >= 18
- Android SDK (API level 35)
- Java 17 or higher

## Installation

```bash
# Install dependencies
npm install

# Run on Android
npm run android
```

## Build Release AAB

```bash
# Build release bundle
cd android && ./gradlew bundleRelease

# AAB file will be at:
# android/app/build/outputs/bundle/release/app-release.aab
```

## Testing

```bash
# Run unit tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## Project Structure

```
src/
├── components/        # Reusable UI components
├── screens/           # App screens
├── services/          # Business logic services
├── utils/             # Utility functions
└── __tests__/         # Unit tests
```

## Release Keystore

- Password: 654321
- Alias: calorie-workout-key
- Validity: 10,000 days

## Technologies Used

- React Native 0.78.2
- TypeScript
- React Navigation
- Jest & React Native Testing Library
