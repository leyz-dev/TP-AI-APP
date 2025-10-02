// app.config.ts
import type { ExpoConfig } from "@expo/config";
import "dotenv/config"; // lets Expo load your .env at build time

const config: ExpoConfig = {
  name: "Pack",
  slug: "pack",
  version: "0.0.1",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "aitravelplannerapp",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  ios: { supportsTablet: true, bundleIdentifier: "com.waev.pack" },
  android: {
    package: "com.waev.pack",
    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: false,
    adaptiveIcon: {
      backgroundColor: "#E6F4FE",
      foregroundImage: "./assets/images/android-icon-foreground.png",
      backgroundImage: "./assets/images/android-icon-background.png",
      monochromeImage: "./assets/images/android-icon-monochrome.png",
    },
  },
  web: { output: "static", favicon: "./assets/images/favicon.png" },
  plugins: [
    "expo-router",
    [
      "expo-splash-screen",
      {
        image: "./assets/images/splash-icon.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#ffffff",
        dark: { backgroundColor: "#000000" },
      },
    ],
  ],
  experiments: { typedRoutes: true, reactCompiler: true },
};

export default config;
