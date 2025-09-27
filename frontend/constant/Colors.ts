/**
 * App color palette based on bluish theme (#001a49).
 * Includes global colors and light/dark mode variations.
 */

export const Colors = {
  // Core brand colors
  primary: "#001a49", // Main bluish brand color
  secondary: "#003366", // Slightly lighter/different shade of blue (optional accent)
  accent: "#0066cc", // Accent blue for highlights/buttons

  // Neutral colors
  white: "#ffffff",
  black: "#000000",
  gray: "#7d7d7d",
  lightGray: "#f2f2f2",

  // Light theme
  light: {
    text: "#11181C",
    background: "#ffffff",
    tint: "#001a49", // primary tint in light mode
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: "#001a49",
  },

  // Dark theme
  dark: {
    text: "#ECEDEE",
    background: "#0d0f14", // dark bluish-gray background
    tint: "#4c6ef5", // brighter blue tint for visibility
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: "#4c6ef5",
  },
};
