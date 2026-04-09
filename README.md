# Settle — NYC Relocation App

A React Native prototype for Settle, an NYC relocation app. Built with Expo SDK 51 and Expo Router.

## Prerequisites

- Node.js 18+
- [Expo Go](https://expo.dev/go) on your iOS or Android device, **or** an iOS Simulator / Android Emulator

## Setup

```bash
# 1. Install dependencies
npx expo install

# 2. Start the dev server
npx expo start
```

Then scan the QR code with Expo Go, or press `i` for iOS simulator / `a` for Android emulator.

## Screens

| Tab | Screen | Key feature |
|-----|--------|-------------|
| Home | Dashboard | Move readiness score, AI alert, module grid |
| Search | Neighborhoods | FlatList with score badges and filter chips |
| Plan | Cost breakdown | Monthly / Upfront tab toggle with progress bars |
| AI | Lease Analysis | Upload → 2s loading → risk cards |
| Timeline | Task tracker | Tap to toggle complete, detail bottom sheet |

## Design Tokens

| Token | Value |
|-------|-------|
| Primary (navy) | `#0a1628` |
| Accent (amber) | `#c8a97a` |
| Background | `#111110` |
| Surface | `#181817` |
| Text | `#e4e2dc` |

## Project Structure

```
app/
  _layout.tsx          # Root stack + SafeAreaProvider
  (tabs)/
    _layout.tsx        # Tab bar with SVG icons
    index.tsx          # Home / Dashboard
    search.tsx         # Neighborhood search
    plan.tsx           # Cost plan
    ai.tsx             # AI lease analysis
    timeline.tsx       # Move timeline
components/
  SettleLogo.tsx       # SVG water-drop logo
  TabIcons.tsx         # Custom SVG tab icons
  PulsingDot.tsx       # Animated ambient dot
constants/
  theme.ts             # Colors, spacing, border radius
data/
  mockData.ts          # All hardcoded mock data
```

## Tech Stack

- **Expo SDK 51** — managed workflow
- **Expo Router 3.5** — file-based navigation
- **react-native-svg** — custom SVG icons
- **react-native-safe-area-context** — safe area insets
- **@expo/vector-icons** — Ionicons for UI icons
