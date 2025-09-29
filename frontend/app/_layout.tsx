import { useFonts } from "expo-font";
import { Stack } from "expo-router";

export default function RootLayout() {
  useFonts({
    Regular: require("../assets/fonts/Poppins-Regular.ttf"),
    Medium: require("../assets/fonts/Poppins-Medium.ttf"),
    Bold: require("../assets/fonts/Poppins-Bold.ttf"),
  });

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="trips/index"
        options={{
          title: "Home",
        }}
      />
      <Stack.Screen
        name="trips/create/index"
        options={{
          title: "Create Trip",
        }}
      />
    </Stack>
  );
}
