import { StyleSheet } from "react-native";
import { COLORS } from "./constants";

export const styles = StyleSheet.create({
  fieldContainer: {
    gap: 4,
  },
  frameBase: {
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrap: {
    justifyContent: "center",
    alignItems: "center",
  },
  actionText: {
    fontSize: 14,
    color: COLORS.subtext,
  },
  helperText: {
    fontSize: 12,
    color: COLORS.subtext,
  },
  errorText: {
    fontSize: 12,
    color: COLORS.error,
  },
  counterText: {
    fontSize: 12,
    color: COLORS.subtext,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
});
