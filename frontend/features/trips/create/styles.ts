import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EEFF",
    padding: 12,
  },
  createCard: { marginBottom: 42 },
  createCardContent: { gap: 8 },
  dateRangeErrorText: { color: "#DC2626", marginTop: 4 },
  companionsFieldsContainer: { flexDirection: "row", gap: 6 },
  flex: { flex: 1 },
  activitiesContainer: { flexDirection: "row", alignItems: "flex-end", gap: 8 },
  activityDaysField: { width: 64 },
  buttonAddActivity: { height: 44, marginBottom: 4 },
  activityListContainer: { marginTop: 12, gap: 8 },
  activityListItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderStyle: "solid",
    gap: 10,
  },
  activityListName: { fontWeight: "600" },
  actvityListDays: { color: "#6B7280" },
});
