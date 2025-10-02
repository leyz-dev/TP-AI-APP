import { Size, Variant } from "./types";

// #TODO: Swap with theme/colors
export const COLORS = {
  primary: "#2563EB",
  primaryText: "#FFFFFF",
  secondary: "#0F172A",
  secondaryText: "#FFFFFF",
  outlineBorder: "#CBD5E1",
  ghostText: "#0F172A",
  disabledBg: "#E5E7EB",
  disabledText: "#9CA3AF",
  danger: "#DC2626",
  dangerText: "#FFFFFF",
};

export const TEXT_COLORS: Record<Variant, string> = {
  primary: COLORS.primaryText,
  secondary: COLORS.secondaryText,
  outline: COLORS.ghostText,
  ghost: COLORS.ghostText,
  danger: COLORS.dangerText,
};

export const SIZES: Record<
  Size,
  {
    padV: number;
    padH: number;
    radius: number;
    gap: number;
    fontSize: number;
    lineHeight: number;
  }
> = {
  sm: { padV: 10, padH: 14, radius: 10, gap: 6, fontSize: 14, lineHeight: 18 },
  md: { padV: 12, padH: 16, radius: 12, gap: 8, fontSize: 16, lineHeight: 20 },
  lg: { padV: 14, padH: 20, radius: 14, gap: 10, fontSize: 18, lineHeight: 22 },
};
