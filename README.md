# Calorie Workout App

A React Native application for Android that analyzes food photos to calculate calories and suggests workout times to burn those calories.

## Features

- 📷 **Photo Capture**: Take photos with camera or select from gallery
- 🔢 **Calorie Calculation**: Automatically estimates calories from food images
- 🏃 **Workout Time Estimation**: Calculates required exercise time for different activities:
  - Running
  - Walking
  - Cycling
  - Swimming

## Technical Specifications

- **Framework**: React Native 0.78.2
- **Platform**: Android only
- **Target SDK**: Android 35
- **Language**: TypeScript
- **UI Language**: English
- **Build Type**: AAB (Android App Bundle)

## Prerequisites

- Node.js >= 18
- Java Development Kit (JDK) 17 or higher
- Android SDK with API Level 35
- Android Studio (optional, for development)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start Metro bundler:
```bash
npm start
```

3. Run on Android device/emulator:
```bash
npm run android
```

## Building Release AAB

### Prerequisites
The release keystore is already configured with the following credentials:
- **Keystore file**: `android/app/my-release-key.keystore`
- **Password**: 654321
- **Key alias**: my-key-alias

### Build Commands

1. Build AAB file:
```bash
npm run build:aab
```

2. The generated AAB file will be located at:
```
android/app/build/outputs/bundle/release/app-release.aab
```

3. Copy to AAB_Builds folder:
```bash
cp android/app/build/outputs/bundle/release/app-release.aab AAB_Builds/
```

## Testing

Run unit tests:
```bash
npm test
```

Run tests with coverage:
```bash
npm test -- --coverage
```

## Project Structure

```
CalorieWorkoutApp/
├── android/                  # Android native code
│   ├── app/
│   │   ├── src/main/
│   │   │   ├── java/        # Kotlin/Java source
│   │   │   └── res/         # Android resources
│   │   └── build.gradle     # App-level Gradle config
│   └── build.gradle         # Project-level Gradle config
├── src/
│   ├── types/               # TypeScript type definitions
│   ├── utils/               # Utility functions
│   │   └── CalorieCalculator.ts  # Calorie calculation logic
│   └── components/          # React components
├── __tests__/               # Unit tests
├── AAB_Builds/              # Release AAB files
├── App.tsx                  # Main app component
├── index.js                 # App entry point
└── package.json            # Node.js dependencies

```

## Key Files

- `App.tsx`: Main application component with camera and analysis UI
- `src/utils/CalorieCalculator.ts`: Core calorie and workout time calculation logic
- `android/app/build.gradle`: Android build configuration (targetSdkVersion 35)
- `android/gradle.properties`: Gradle properties including keystore configuration

## How It Works

1. User takes a photo or selects from gallery
2. Image is analyzed to identify food type
3. Calories are estimated based on food database
4. Workout times are calculated using metabolic equivalents
5. Results are displayed with exercise recommendations

## Food Database

The app includes a basic food database with common items:
- Pizza, Burger, Pasta, Salad
- Rice Bowl, Sandwich, Sushi
- Fried Chicken, Steak
- Donut, Ice Cream
- Coffee, Smoothie, Soup, Taco

## Exercise Calorie Burn Rates (per minute, 70kg person)

- Running (8km/h): 10 kcal/min
- Walking (5km/h): 4 kcal/min
- Cycling (moderate): 7.5 kcal/min
- Swimming (moderate): 8 kcal/min

## License

This project is for educational purposes.

## Notes

- Camera permissions are required for photo capture
- Storage permissions are required for gallery access
- The food recognition is simulated (in production, use ML model or API)
- Calorie estimates are approximate and for reference only
