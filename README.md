# CalorieFit

A React Native Android app that calculates calories from food photos and recommends workout time to burn those calories.

## 📱 Features

- 📸 **Take Photo**: Capture food images using camera or select from gallery
- 🔢 **Calorie Calculation**: Automatically estimates calories from food photos
- 🏃 **Workout Time**: Calculates time needed for various exercises to burn the calories
- 🎨 **Beautiful UI**: Clean, modern interface with English text
- 📱 **Android Only**: Optimized for Android (targetSdkVersion 35)

## 🎯 Supported Exercises

- Running
- Walking
- Cycling
- Swimming
- Jump Rope
- Yoga
- Weight Training

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18
- JDK 17 or higher
- Android SDK (API 35)
- Android Studio (recommended)

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
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

4. Run on Android device/emulator
```bash
npm run android
```

## 📦 Build Release AAB

### Easy Method (Recommended)

Use the provided build script:

```bash
./build-aab.sh
```

This will:
- Clean previous builds
- Build the release AAB
- Copy the AAB to `AAB_Builds/` folder with timestamp

### Manual Method

```bash
cd android
./gradlew clean
./gradlew bundleRelease
```

The AAB file will be located at:
```
android/app/build/outputs/bundle/release/app-release.aab
```

Then copy it to AAB_Builds folder:
```bash
mkdir -p ../AAB_Builds
cp app/build/outputs/bundle/release/app-release.aab ../AAB_Builds/CalorieFit.aab
```

## 🔐 Release Keystore Information

The app is signed with the following keystore:

- **Keystore File**: `android/app/caloriefit-release.keystore`
- **Store Password**: `654321`
- **Key Alias**: `caloriefit-key-alias`
- **Key Password**: `654321`

⚠️ **Important**: Keep this keystore file safe! You'll need it for all future app updates.

## 📁 Project Structure

```
CalorieFit/
├── App.tsx                    # Main app component with UI and logic
├── index.js                   # App entry point
├── package.json               # Dependencies and scripts
├── babel.config.js            # Babel configuration
├── metro.config.js            # Metro bundler configuration
├── tsconfig.json              # TypeScript configuration
├── build-aab.sh              # Build script for AAB
├── AAB_Builds/               # Release AAB files (created after build)
├── android/                   # Android native code
│   ├── app/
│   │   ├── build.gradle      # App build configuration
│   │   ├── src/main/
│   │   │   ├── AndroidManifest.xml
│   │   │   ├── java/com/caloriefit/
│   │   │   │   ├── MainActivity.kt
│   │   │   │   └── MainApplication.kt
│   │   │   └── res/          # Resources (icons, strings, etc.)
│   │   ├── debug.keystore    # Debug signing key
│   │   └── caloriefit-release.keystore  # Release signing key
│   ├── build.gradle          # Root build configuration
│   ├── settings.gradle       # Project settings
│   └── gradle.properties     # Gradle properties (includes keystore config)
└── create_icons.py           # Script to generate launcher icons
```

## 🛠 Tech Stack

- **React Native**: 0.78.2
- **TypeScript**: ~5.6.2
- **React**: 18.3.1
- **React Native Image Picker**: ^7.1.0 - Gallery selection
- **React Native Vision Camera**: ^4.0.0 - Camera access
- **Gradle**: 8.6
- **Android Build Tools**: 35.0.0
- **Target SDK**: 35
- **Min SDK**: 24

## 🎨 App Icons

The app includes custom launcher icons for all Android densities:
- mdpi (48x48)
- hdpi (72x72)
- xhdpi (96x96)
- xxhdpi (144x144)
- xxxhdpi (192x192)

Icons feature a blue background with a white 'C' design.

## 📝 Development Notes

### Android Configuration

- **targetSdkVersion**: 35 (Android 15)
- **minSdkVersion**: 24 (Android 7.0)
- **compileSdkVersion**: 35
- **Namespace**: com.caloriefit
- **Application ID**: com.caloriefit

### Permissions

The app requests the following permissions:
- `CAMERA` - Take photos of food
- `READ_EXTERNAL_STORAGE` - Access gallery
- `WRITE_EXTERNAL_STORAGE` - Save photos
- `READ_MEDIA_IMAGES` - Read media on Android 13+

### Food Database

The app includes a built-in food database with calorie information per 100g:
- Rice: 130 kcal
- Chicken: 165 kcal
- Beef: 250 kcal
- Pork: 242 kcal
- Fish: 206 kcal
- And more...

### Exercise Database

Calorie burn rates (per minute):
- Running: 10 kcal/min
- Jump Rope: 12 kcal/min
- Swimming: 11 kcal/min
- Cycling: 8 kcal/min
- And more...

## 🐛 Troubleshooting

### Gradle Build Fails

If you encounter Gradle build errors:

1. Clean the build:
```bash
cd android
./gradlew clean
```

2. Make sure you have JDK 17 installed:
```bash
java -version
```

3. Check Android SDK is properly installed and ANDROID_HOME is set

### Metro Bundler Issues

If Metro won't start:

```bash
npx react-native start --reset-cache
```

### App Won't Install

1. Uninstall any previous version
2. Check device has enough storage
3. Ensure USB debugging is enabled

## 📄 License

This project is created for demonstration purposes.

## 👨‍💻 Developer

Built with React Native and ❤️

---

**Note**: This is a prototype app. In production, you would integrate with a real AI/ML service for accurate food recognition and calorie calculation.
