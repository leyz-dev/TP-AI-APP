import { toastConfig } from "@/configs/toastConfig";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  useFonts({
    Regular: require("../assets/fonts/Poppins-Regular.ttf"),
    Medium: require("../assets/fonts/Poppins-Medium.ttf"),
    Bold: require("../assets/fonts/Poppins-Bold.ttf"),
  });

  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="trips/index"
          options={{ title: "Home", headerBackVisible: false }}
        />
        <Stack.Screen name="trips/create" options={{ title: "Create Trip" }} />
      </Stack>
      <Toast config={toastConfig} />
    </>
  );
}
