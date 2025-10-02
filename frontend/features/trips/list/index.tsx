// app/trips/index.tsx (or wherever TripList lives)
import { MaterialIcons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
} from "react-native";

import Button from "@/components/Button";
import { listTrips, type Trip } from "@/services/trips";
import OverviewCards from "./components/OverviewCards";
import TripListItem from "./components/TripListItem";
import { style } from "./styles";

// #WIP: Cleanup later

const TripList = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTrips = useCallback(async () => {
    try {
      setError(null);
      const data = await listTrips();
      setTrips(data);
    } catch (e: any) {
      setError(e?.message ?? "Failed to load trips");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTrips();
  }, []);

  // refresh when returning to the screen
  useFocusEffect(
    useCallback(() => {
      fetchTrips();
    }, [])
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchTrips();
    setRefreshing(false);
  }, [fetchTrips]);

  return (
    <View style={style.container}>
      <OverviewCards />

      <Button
        leftIcon={<MaterialIcons name="add" color={"#FFFFFF"} />}
        onPress={() => router.push("/trips/create")}
        label="Create New Trip"
        style={{ marginBottom: 12 }}
      />

      <View style={style.tripSection}>
        <Text style={style.tripText}>Trips</Text>

        {loading ? (
          <View style={{ paddingTop: 84, alignItems: "center" }}>
            <ActivityIndicator size="large" />
          </View>
        ) : error ? (
          <View style={{ paddingTop: 84, alignItems: "center" }}>
            <Text style={{ color: "#DC2626", marginBottom: 8 }}>
              Something went wrong.
            </Text>
            <Button
              label="Retry"
              onPress={fetchTrips}
              variant="primary"
              size="sm"
            />
          </View>
        ) : trips.length === 0 ? (
          <View style={{ paddingTop: 84, alignItems: "center" }}>
            <Text style={{ color: "#475569" }}>No Trips yet.</Text>
          </View>
        ) : (
          <FlatList
            style={style.flatList}
            data={trips}
            keyExtractor={t => t.id!}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            contentContainerStyle={style.flatListContentContainer}
            renderItem={({ item: trip }) => (
              <TripListItem key={trip.id} trip={trip} />
            )}
          />
        )}
      </View>
    </View>
  );
};

export default TripList;
