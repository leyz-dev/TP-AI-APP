/**
 * App color palette for AI Travel Planner
 * Based on bluish theme (#001a49), with fun + friendly accents.
 * Includes global colors and light/dark mode variations.
 */

export const Colors = {
  // Core brand colors
  primary: "#001a49", // Deep bluish brand color
  secondary: "#004080", // Medium navy for headers/sections
  accent: "#4FC3F7", // Sky blue accent (travel/freshness)
  highlight: "#FF7043", // Coral/orange highlight (fun/energy)

  // Neutral colors
  white: "#ffffff",
  black: "#000000",
  gray: "#7d7d7d",
  lightGray: "#f2f2f2",

  // Light theme
  light: {
    text: "#11181C",
    background: "#ffffff",
    card: "#f9f9fb", // very light gray/blue card bg
    tint: "#001a49", // primary tint in light mode
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: "#001a49",
    button: "#4FC3F7", // sky blue button
    buttonText: "#ffffff",
  },

  // Dark theme
  dark: {
    text: "#ECEDEE",
    background: "#0d0f14", // dark bluish-gray background
    card: "#1a1d29", // dark navy card bg
    tint: "#4FC3F7", // brighter sky blue for visibility
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: "#4FC3F7",
    button: "#FF7043", // coral/orange button for contrast
    buttonText: "#ffffff",
  },
};
