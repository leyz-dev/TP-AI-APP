import { StyleSheet } from "react-native";
import { COLORS } from "./constants";

export const variantStyles = StyleSheet.create({
  primary: {
    backgroundColor: COLORS.primary,
  },
  secondary: {
    backgroundColor: COLORS.secondary,
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: COLORS.outlineBorder,
  },
  ghost: {
    backgroundColor: "transparent",
  },
  danger: {
    backgroundColor: COLORS.danger,
  },
});

export const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  disabled: {
    backgroundColor: COLORS.disabledBg,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 1,
  },
  textBase: {
    fontWeight: "600",
    includeFontPadding: false,
    textAlignVertical: "center",
  },
  iconWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
});
