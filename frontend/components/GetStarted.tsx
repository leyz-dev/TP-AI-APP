import { Colors } from "@/constant/Colors";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Login() {
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={require("../assets/images/login.jpg")}
        style={{
          width: "100%",
          height: 520,
        }}
      />
      <View style={styles.container}>
        <Text
          style={{
            fontFamily: "Bold",
            fontSize: 30,
            textAlign: "center",
            marginTop: 20,
          }}
        >
          Ai Travel Planner
        </Text>
        <Text
          style={{
            fontFamily: "Regular",
            textAlign: "center",
            fontSize: 16,
            color: Colors.gray,
            marginTop: 20,
          }}
        >
          Your next adventure starts here. AI creates personalized itineraries
          so you can explore the world smarter, not harder.
        </Text>
        <TouchableOpacity style={styles.button}>
          <Text
            onPress={() => router.push("/auth/sign-in")}
            style={{
              color: Colors.white,
              textAlign: "center",
              fontFamily: "Medium",
              fontSize: 16,
            }}
          >
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    marginTop: -20,
    height: "100%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
  },
  button: {
    padding: 15,
    backgroundColor: Colors.primary,
    borderRadius: 99,
    marginTop: "35%",
  },
});
