# Calorie Workout App

A React Native Android application that calculates calories from food photos and recommends workout times to burn those calories.

## Features

- 📸 **Photo-based Calorie Detection**: Take a photo of food to estimate calorie content
- 🏃 **Workout Recommendations**: Get personalized workout time recommendations
- 💪 **Multiple Exercise Options**: Choose from 15+ different workout types
- 📊 **Detailed Information**: View food confidence levels and workout intensities
- 🎨 **Clean UI**: Simple and intuitive user interface

## Technical Specifications

### Platform
- **Android Only**: This app is built specifically for Android
- **Target SDK**: 35
- **Minimum SDK**: 24
- **React Native Version**: 0.78.2

### Architecture
- **No Expo**: Built with React Native CLI for better native control
- **TypeScript**: Full TypeScript support for type safety
- **Modular Design**: Separated utility functions for calorie and workout calculations

## Project Structure

```
CalorieWorkoutApp/
├── android/                    # Android native code
│   ├── app/
│   │   ├── build.gradle       # targetSdkVersion 35 configured
│   │   └── src/main/
│   │       ├── AndroidManifest.xml
│   │       ├── java/com/calorieworkoutapp/
│   │       └── res/           # App icons and resources
│   └── gradle.properties      # Release signing configuration
├── src/
│   └── utils/
│       ├── calorieCalculator.ts   # Calorie calculation logic
│       └── workoutCalculator.ts   # Workout time calculation
├── __tests__/
│   └── utils/
│       ├── calorieCalculator.test.ts
│       └── workoutCalculator.test.ts
├── App.tsx                    # Main application component
├── index.js                   # Entry point
└── package.json

```

## Installation

### Prerequisites
- Node.js >= 18
- Java Development Kit (JDK) 17 or higher
- Android SDK with Build Tools 35.0.0
- Android Studio (recommended)

### Setup

1. **Clone the repository**
```bash
cd ~/Documents/react-native/CalorieWorkoutApp
```

2. **Install dependencies**
```bash
npm install
```

3. **Start Metro bundler**
```bash
npm start
```

4. **Run on Android**
```bash
npm run android
```

## Building for Release

### Build AAB (Android App Bundle)

1. **Clean and build**
```bash
cd android
./gradlew clean
./gradlew bundleRelease
```

2. **Output location**
The AAB file will be generated at:
```
android/app/build/outputs/bundle/release/app-release.aab
```

### Release Configuration

- **Keystore**: `calorie-release-key.keystore`
- **Alias**: `calorie-key-alias`
- **Password**: `654321`

## Testing

Run unit tests:
```bash
npm test
```

Run tests with coverage:
```bash
npm test -- --coverage
```

## Features in Detail

### Calorie Calculation
- Supports 20+ common food items
- Provides confidence percentage for detection
- Shows serving size information
- Classifies meal size (Snack, Light, Regular, Large, Very Large)

### Workout Calculator
- **15+ Exercise Types**:
  - Walking, Brisk Walking, Jogging, Running, Fast Running
  - Cycling, Fast Cycling, Swimming, Jumping Rope
  - Hiking, Yoga, Weight Training
  - Basketball, Soccer, Dancing

- **Intensity Levels**: Low, Moderate, High, Very High
- **Time Formatting**: Automatically formats as hours and minutes
- **Weight Adjustment**: Can adjust for different user weights

### Food Database
Includes common foods:
- Rice, Fried Rice, Ramen, Pasta
- Chicken, Beef, Pork
- Bread, Croissant
- Hamburger, Pizza, French Fries
- Coca Cola, Coffee
- Apple, Banana
- Salad, Sandwich

## Code Style

- **Text Language**: All user-facing text is in English
- **Comments**: Code comments are in Korean (한글)
- **TypeScript**: Strict type checking enabled
- **Testing**: Comprehensive unit tests for all utilities

## Future Enhancements

- [ ] Integrate real camera functionality with react-native-vision-camera
- [ ] Add ML model for actual food recognition
- [ ] Support for custom food entries
- [ ] Workout tracking and history
- [ ] User profiles and goals
- [ ] Calorie tracking over time
- [ ] Integration with fitness trackers

## License

This project is for educational and demonstration purposes.

## Development Notes

### targetSdkVersion 35
The app is configured to target Android SDK 35, meeting the latest Google Play Store requirements.

### No Expo
This project deliberately avoids Expo to have full control over native code and configurations.

### Release Signing
The release keystore is included for demonstration purposes. In a production environment, keep your keystore secure and never commit it to version control.

## Troubleshooting

### Common Issues

1. **Build fails**: Clean the build
```bash
cd android && ./gradlew clean
```

2. **Metro bundler issues**: Reset cache
```bash
npm start -- --reset-cache
```

3. **Dependency issues**: Reinstall
```bash
rm -rf node_modules package-lock.json
npm install
```

## Contact

For questions or issues, please refer to the project documentation.
