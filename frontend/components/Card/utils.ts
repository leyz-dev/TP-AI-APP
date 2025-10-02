import { Platform, ViewStyle } from "react-native";
import { TOKENS } from "./constants";
import { Variant } from "./types";

export const getShadow = (elevation = 2): ViewStyle => {
  if (elevation <= 0) return {};
  if (Platform.OS === "android") {
    return { elevation };
  }
  // iOS shadow approximation
  const opacity = Math.min(0.22 + elevation * 0.01, 0.35);
  const radius = Math.min(4 + elevation * 1.2, 12);
  const offset = Math.min(1 + Math.floor(elevation / 2), 8);
  return {
    shadowColor: "#000",
    shadowOpacity: opacity,
    shadowRadius: radius,
    shadowOffset: { width: 0, height: offset },
  };
};

export const overlayColor = (variant: Variant): string | undefined => {
  if (variant === "ghost" || variant === "filled" || variant === "outlined") {
    return `${TOKENS.color.press}`;
  }
  // elevated: slightly dim
  return "rgba(0,0,0,0.02)";
};
