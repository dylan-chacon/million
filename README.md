# Million - Real State App

## Overview

Million is a React Native application that displays cryptocurrency information. The app features a list of cryptocurrencies with detailed views, built using modern React Native architecture with TypeScript.

## Features

- 📱 Cross-platform (iOS & Android)
- 🔍 Real-time cryptocurrency search
- 📊 Detailed cryptocurrency information
- ♾️ Infinite scrolling
- 🎨 Modern UI with React Native components
- ⚡ Performance optimized
- 🔄 Automatic data refresh

## Project Structure

### Core Files
- `App.tsx` - Main application entry point with React Query provider
- `index.js` - React Native app registration
- `package.json` - Project dependencies and scripts

### Source Code (`src`)
```
src/
├── modules/crypto/          # Cryptocurrency module
│   ├── hooks/              # Custom hooks for data fetching
│   ├── models/             # Data models and interfaces
│   ├── screen/             # Screen components
│   └── store/              # State management
├── navigation/              # App navigation setup
└── shared/                  # Shared components and utilities
    └── components/
        └── organisms/       # Complex UI components
```

## Architecture

### Navigation
The app uses React Navigation with a stack navigator:

- **CryptoList**: Main screen showing list of cryptocurrencies
- **CryptoDetail**: Detail screen for individual cryptocurrency

### Data Models

#### Crypto Interface
```typescript
interface Crypto {
  id: string;
  symbol: string;
  name: string;
  rank: number;
  price_usd: string;
  percent_change_1h: string;
  percent_change_24h: string;
  percent_change_7d: string;
  market_cap_usd: string;
  volume24: number;
  csupply: string;
  tsupply: string;
  msupply: string | null;
}
```

### State Management

- **Zustand Store** (`useCryptoStore`) - Managing cryptocurrency list, search functionality, and loading states
- **React Query** (`useFetchCryptos`) - Server state management with infinite scrolling and cache management

## Key Components

### Screens

#### CryptoListScreen
- Displays cryptocurrency list with search functionality
- Implements infinite scrolling with FlatList
- Performance optimized with `removeClippedSubviews`

#### CryptoDetailScreen
- Shows detailed cryptocurrency information
- Receives data via navigation parameters

### Components

#### CryptoCard
Reusable card component displaying:
- Cryptocurrency name and symbol
- Current price
- Market cap
- 24h price change
- Navigation to detail screen

## Getting Started

### Prerequisites
Complete the [React Native environment setup](https://reactnative.dev/docs/set-up-your-environment).

### Installation
```sh
# Install dependencies
npm install

# iOS specific (CocoaPods)
bundle install
bundle exec pod install
```

### Running the App
```sh
# Start Metro
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios
```

## Key Technologies

- **React Native**: Cross-platform mobile development
- **TypeScript**: Type-safe development
- **React Query**: Server state management
- **Zustand**: Lightweight state management
- **React Navigation**: Navigation library

## Platform Configuration

### Android
- Main application: `android/app/src/main/java/com/million/MainApplication.kt`
- Supports both old and new React Native architecture
- Hermes JavaScript engine enabled

### iOS
- App delegate: `ios/Million/AppDelegate.swift`
- CocoaPods dependencies: `ios/Podfile`

## Development Tools

### Configuration Files
- `.eslintrc.js` - ESLint configuration
- `.prettierrc.js` - Code formatting rules
- `babel.config.js` - Babel transpilation setup
- `metro.config.js` - Metro bundler configuration
- `tsconfig.json` - TypeScript configuration
