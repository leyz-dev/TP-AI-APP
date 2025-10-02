import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  overviewSection: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: 8,
  },
  card: {
    flex: 1,
  },
  cardText: {
    alignSelf: "center",
    textAlign: "center",
    color: "#717182",
  },
  upcomingCountText: {
    fontSize: 24,
    fontWeight: 800,
    color: "#165DFC",
  },
  ongoingCountText: {
    fontSize: 24,
    fontWeight: 800,
    color: "#00A63D",
  },
  completedCountText: {
    fontSize: 24,
    fontWeight: 800,
    color: "#4A5565",
  },
});
