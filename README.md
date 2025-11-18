# Calorie Workout App

A React Native application that calculates calories from food photos and estimates workout time needed to burn those calories.

## Features

- 📷 Take photos of food
- 🍔 Calorie calculation (simulated)
- 💪 Workout time estimation
- 📱 Android support only
- ✅ Comprehensive unit tests

## Requirements

- Node.js >= 18
- React Native 0.78.2
- Android SDK (targetSdkVersion 35)
- Java Development Kit (JDK)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start Metro bundler:
```bash
npm start
```

3. Run on Android:
```bash
npm run android
```

## Testing

Run unit tests:
```bash
npm test
```

## Building Release AAB

1. Generate release AAB:
```bash
npm run build:android
```

2. The AAB file will be saved to `AAB_Builds/` folder.

## Release Configuration

- Keystore file: `android/app/calorieworkoutapp-release.keystore`
- Keystore password: 654321
- Key alias: calorieworkoutapp-key-alias
- Key password: 654321

## Project Structure

```
CalorieWorkoutApp/
├── android/              # Android native code
├── src/
│   └── utils/           # Utility functions
│       ├── calorieCalculator.ts
│       └── __tests__/   # Unit tests
├── AAB_Builds/          # Release AAB files
├── App.tsx              # Main app component
├── index.js             # Entry point
└── package.json         # Dependencies
```

## How It Works

1. User taps "Take Photo" button
2. Camera opens with permissions
3. User takes a photo of food
4. App simulates calorie analysis (in production, would use AI/ML model)
5. Display calorie count and estimated workout time
6. Workout time calculated based on 7 calories burned per minute

## Future Enhancements

- Integration with real AI/ML food recognition model
- Support for multiple workout types with different calorie burn rates
- Food history tracking
- Nutrition information beyond calories
- iOS support

## License

This project is for educational purposes.
