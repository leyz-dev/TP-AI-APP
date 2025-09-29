import { router } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

const Trips = () => {
  return (
    <View style={style.container}>
      <View style={style.overviewSection}>
        <View style={style.card}>
          <Text style={[style.cardText, style.upcomingCountText]}>1</Text>
          <Text style={style.cardText}>Upcoming</Text>
        </View>
        <View style={style.card}>
          <Text style={[style.cardText, style.ongoingCountText]}>1</Text>
          <Text style={style.cardText}>Ongoing</Text>
        </View>
        <View style={style.card}>
          <Text style={[style.cardText, style.completedCountText]}>1</Text>
          <Text style={style.cardText}>Completed</Text>
        </View>
      </View>
      <Pressable onPress={() => router.push("/trips/create")}>
        <View style={style.createButton}>
          <Text style={style.createButtonText}>+ Create New Trip</Text>
        </View>
      </Pressable>
      <View style={style.tripSection}>
        <Text style={style.tripText}>Trips</Text>
        <FlatList
          style={{ flex: 1 }}
          data={[...Array(30).keys()]}
          keyExtractor={i => i.toString()}
          contentContainerStyle={{ gap: 10 }}
          renderItem={({ item }) => (
            <View style={style.card}>
              <Text>Title {item}</Text>
              <Text>Location {item}</Text>
              <Text>Date Range {item}</Text>
              <Text>Companion {item}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default Trips;

const style = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#E8EEFF",
    gap: 16,
    flex: 1,
  },
  overviewSection: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: 16,
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    flex: 1,
    borderRadius: 5,
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
  createButton: {
    backgroundColor: "#030213",
    padding: 12,
    borderRadius: 24,
  },
  createButtonText: {
    color: "#FFFFFF",
    textAlign: "center",
  },
  tripSection: {
    gap: 12,
    flex: 1,
  },
  tripText: {
    fontSize: 24,
    fontWeight: 600,
  },
  tripListContainer: {
    gap: 10,
  },
});
