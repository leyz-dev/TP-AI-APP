import { Size } from "./types";

export const COLORS = {
  text: "#0F172A",
  subtext: "#64748B",
  bg: "#FFFFFF",
  filledBg: "#F1F5F9",
  border: "#CBD5E1",
  focus: "#2563EB",
  error: "#DC2626",
  disabledText: "#9CA3AF",
  disabledBg: "#F3F4F6",
  placeholder: "#9CA3AF",
};

export const SIZES: Record<
  Size,
  {
    padV: number;
    padH: number;
    radius: number;
    gap: number;
    fontSize: number;
    label: number;
    lineHeight: number;
  }
> = {
  sm: {
    padV: 10,
    padH: 14,
    radius: 10,
    gap: 6,
    fontSize: 14,
    label: 12,
    lineHeight: 18,
  },
  md: {
    padV: 12,
    padH: 16,
    radius: 12,
    gap: 8,
    fontSize: 16,
    label: 14,
    lineHeight: 20,
  },
  lg: {
    padV: 14,
    padH: 20,
    radius: 14,
    gap: 10,
    fontSize: 18,
    label: 16,
    lineHeight: 22,
  },
};
