# Calorie Workout App

A React Native Android application that calculates calories from food photos and recommends workout times to burn those calories.

## Features

- 📸 **Photo Capture**: Take photos of your food or select from gallery
- 🍎 **Calorie Detection**: Automatic food recognition and calorie calculation
- 💪 **Workout Recommendations**: Get personalized exercise suggestions
- ⏱️ **Time Calculation**: See how long you need to exercise to burn the calories
- 🎯 **Multiple Exercises**: Choose from 15+ different workout options

## Tech Stack

- **React Native**: 0.78.2
- **TypeScript**: 5.6.2
- **Target SDK**: Android 35
- **Build Tool**: Gradle 8.8

## Prerequisites

- Node.js >= 18
- Android SDK 35
- Java 17 or higher

## Installation

1. Clone the repository
```bash
git clone <repository-url>
cd react-anycase-app
```

2. Install dependencies
```bash
npm install
```

3. Start Metro bundler
```bash
npm start
```

4. Run on Android
```bash
npm run android
```

## Building

### Debug Build
```bash
cd android
./gradlew assembleDebug
```

### Release AAB
```bash
npm run build:aab
```

The `.aab` file will be generated in `AAB_Builds/` directory.

### Release APK
```bash
npm run build:android
```

## Testing

Run all unit tests:
```bash
npm test
```

Run with coverage:
```bash
npm test -- --coverage
```

## Project Structure

```
CalorieWorkoutApp/
├── android/              # Android native code
├── src/
│   ├── components/       # React components
│   │   ├── CameraScreen.tsx
│   │   └── ResultScreen.tsx
│   ├── services/         # Business logic
│   │   ├── CalorieCalculator.ts
│   │   └── WorkoutCalculator.ts
│   ├── types/            # TypeScript types
│   ├── utils/            # Utility functions
│   └── __tests__/        # Unit tests
├── App.tsx               # Main app component
└── index.js              # Entry point
```

## Release Configuration

The release keystore is already configured with:
- **Store Password**: 654321
- **Key Alias**: release-key
- **Key Password**: 654321

**Important**: In production, use a secure password and store credentials safely.

## Food Database

The app includes calorie data for 30+ common food items including:
- Main dishes (rice, pasta, pizza, etc.)
- Proteins (chicken, beef, fish, etc.)
- Vegetables and fruits
- Snacks and beverages

## Workout Options

15+ exercises with calorie burn rates:
- Light: Yoga, Walking
- Moderate: Cycling, Swimming, Weight Training
- Intense: Running, Jump Rope, Basketball

## License

Private - All Rights Reserved

## Author

CalorieWorkout Development Team
