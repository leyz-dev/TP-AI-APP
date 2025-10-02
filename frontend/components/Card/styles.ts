import { StyleSheet } from "react-native";
import { TOKENS } from "./constants";

export const baseStyles = StyleSheet.create({
  card: {
    backgroundColor: TOKENS.color.bg,
    overflow: "hidden",
  },
  outlined: {
    borderWidth: 1,
    borderColor: TOKENS.color.outline,
  },
  filled: {
    backgroundColor: TOKENS.color.filledBg,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerWrap: {
    paddingBottom: 0,
  },
  headerTexts: {
    flex: 1,
    minHeight: 40,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: TOKENS.color.text,
  },
  subtitle: {
    marginTop: 2,
    fontSize: 13,
    color: TOKENS.color.subtext,
  },
  content: {},
  footer: {
    paddingTop: 12,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: TOKENS.color.outline,
    marginTop: 12,
    marginBottom: 12,
  },
});
