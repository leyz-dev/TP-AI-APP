import Card from "@/components/Card";
import { Trip } from "@/services/trips";
import { router } from "expo-router";
import { Pressable, Text } from "react-native";

// #WIP: Cleanup later

// --- small date helpers (no moment) ---
const fmt = new Intl.DateTimeFormat(undefined, {
  year: "numeric",
  month: "short",
  day: "numeric",
});
const parseISO = (s?: string) => (s ? new Date(s + "T00:00:00") : undefined);
const formatRange = (start?: string, end?: string) => {
  const a = parseISO(start),
    b = parseISO(end);
  if (!a && !b) return "—";
  if (a && !b) return fmt.format(a);
  if (!a && b) return fmt.format(b);
  return `${fmt.format(a!)} — ${fmt.format(b!)}`;
};

const TripListItem = ({ trip }: { trip: Trip }) => {
  const companions =
    (typeof trip.adults === "number" ? trip.adults : 0) +
    (typeof trip.children === "number" ? trip.children : 0);

  return (
    <Pressable onPress={() => router.push(`/trips/${trip.id}`)}>
      <Card>
        <Card.Content style={{ gap: 4 }}>
          <Text style={{ fontWeight: "700", fontSize: 16 }}>
            {trip.title || trip.destination}
          </Text>
          {trip.title ? (
            <Text style={{ color: "#475569" }}>{trip.destination}</Text>
          ) : null}
          <Text style={{ color: "#334155" }}>
            Date: {formatRange(trip.range?.start, trip.range?.end)}
          </Text>
          <Text style={{ color: "#334155" }}>
            Companions: {companions || "—"}
          </Text>
        </Card.Content>
      </Card>
    </Pressable>
  );
};

export default TripListItem;
