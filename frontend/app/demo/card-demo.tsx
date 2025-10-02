import Card from "@/components/Card";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, Text, View } from "react-native";

const CardDemo = () => {
  return (
    <ScrollView>
      <View style={{ padding: 16, gap: 16 }}>
        {/* Size */}
        <Card size="sm">
          <Card.Content>
            <Text>Small</Text>
          </Card.Content>
        </Card>
        <Card size="md">
          <Card.Content>
            <Text>Medium</Text>
          </Card.Content>
        </Card>
        <Card size="lg">
          <Card.Content>
            <Text>Large</Text>
          </Card.Content>
        </Card>

        {/* Variant */}
        <Card variant="elevated">
          <Card.Content>
            <Text>Elevated</Text>
          </Card.Content>
        </Card>
        <Card variant="outlined">
          <Card.Content>
            <Text>Outlines</Text>
          </Card.Content>
        </Card>
        <Card variant="filled">
          <Card.Content>
            <Text>Filled</Text>
          </Card.Content>
        </Card>
        <Card variant="ghost">
          <Card.Content>
            <Text>Ghost</Text>
          </Card.Content>
        </Card>

        {/* Elevated default */}
        <Card onPress={() => {}}>
          <Card.Header
            title="Trip to Tokyo"
            subtitle="Oct 12–18 • 6 nights • 2 guests"
            leading={<MaterialIcons name="flight" size={22} />}
            trailing={<MaterialIcons name="more-vert" size={20} />}
          />
          <Card.Divider />
          <Card.Content>
            <Text>Weather: 18–24°C, light showers.</Text>
          </Card.Content>
          <Card.Footer>
            <Text style={{ fontWeight: "600" }}>Notes: Insert note</Text>
          </Card.Footer>
        </Card>

        {/* Outlined, pressable */}
        <Card
          variant="outlined"
          onPress={() => {}}
          size="lg"
          fullWidth
          accessibilityLabel="Open Kyoto itinerary"
        >
          <Card.Header title="Kyoto Day Trip" subtitle="Fushimi Inari, Gion" />
          <Card.Content style={{ marginTop: 8 }}>
            <Text numberOfLines={2}>
              Don’t forget the JR pass and camera batteries.
            </Text>
          </Card.Content>
        </Card>

        {/* Ghost, custom radius/elevation */}
        <Card variant="ghost" onPress={() => {}} radius={20} elevation={0}>
          <Card.Content>
            <Text>Ghost card with custom radius and no shadow.</Text>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};

export default CardDemo;
