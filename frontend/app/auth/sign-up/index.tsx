import { Colors } from "@/constant/Colors";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
} from "react-native";
import facebook from "../../../assets/images/facebook.png";
import google from "../../../assets/images/google.png";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function SignUp() {
  const router = useRouter();

  const [rememberMe, setRememberMe] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Sign Up</Text>
        <View style={styles.circle1}></View>
        <View style={styles.circle2}></View>
        <View style={styles.circle3}></View>
      </View>

      {/* Form Section */}
      <View style={styles.formContainer}>
        <Text style={styles.welcomeTitle}>Create Account!</Text>
        <Text style={styles.subtitle}>
          Fill in your details to create your account
        </Text>

        {/* Full Name Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor={Colors.gray}
          />
        </View>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            placeholderTextColor={Colors.gray}
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={Colors.gray}
          />
        </View>

        {/* Confirm Password Input */}
        <View style={styles.inputContainer}>
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor={Colors.gray}
          />
        </View>

        {/* Terms and Conditions */}
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.rememberContainer}
            onPress={() => setRememberMe(!rememberMe)}
          >
            <View
              style={[styles.checkbox, rememberMe && styles.checkboxChecked]}
            >
              {rememberMe && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.rememberText}>
              I agree to the{" "}
              <Text style={styles.termsLink}>Terms and condition</Text>
            </Text>
          </TouchableOpacity>
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity style={styles.signUpButton}>
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>OR CONTINUE WITH</Text>
          <View style={styles.divider} />
        </View>

        {/* Social Login Buttons */}
        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={facebook}
              style={styles.socialIcon}
              resizeMode="contain"
            />
            <Text style={styles.socialButtonText}>Sign Up with Facebook</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={google}
              style={styles.socialIcon}
              resizeMode="contain"
            />
            <Text style={styles.socialButtonText}>Sign Up with Google</Text>
          </TouchableOpacity>
        </View>

        {/* Sign In Link */}
        <View style={styles.signInContainer}>
          <Text style={styles.signInText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => router.push("/auth/sign-in")}>
            <Text style={styles.signInLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    height: height * 0.2, // 25% of screen height
    width: "100%",
    backgroundColor: Colors.primary,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    paddingBottom: 16,
    paddingLeft: 20,
    overflow: "hidden",
    position: "relative",
  },
  // Wavy Circles - made smaller
  circle1: {
    position: "absolute",
    top: -30,
    right: -20,
    width: 150,
    height: 150,
    borderRadius: 100,
    backgroundColor: Colors.accent,
    opacity: 0.15,
  },
  circle2: {
    position: "absolute",
    top: -50,
    right: 15,
    width: 150,
    height: 150,
    borderRadius: 100,
    backgroundColor: Colors.secondary,
    opacity: 0.2,
  },
  circle3: {
    position: "absolute",
    top: -25,
    right: -40,
    width: 150,
    height: 150,
    borderRadius: 100,
    backgroundColor: Colors.accent,
    opacity: 0.1,
  },
  headerTitle: {
    color: Colors.white,
    fontFamily: "Bold",
    fontSize: 28,
    marginBottom: 4,
    zIndex: 1,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -15,
  },
  welcomeTitle: {
    fontFamily: "Bold",
    fontSize: 22,
    color: Colors.black,
    marginBottom: 6,
  },
  subtitle: {
    fontFamily: "Regular",
    fontSize: 14,
    color: Colors.gray,
    marginBottom: 24,
    lineHeight: 20,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    padding: 14,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.lightGray,
    fontFamily: "Regular",
    fontSize: 14,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  rememberContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 3,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  checkmark: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: "bold",
  },
  rememberText: {
    fontFamily: "Regular",
    fontSize: 13,
    color: Colors.gray,
    flex: 1,
    lineHeight: 18,
  },
  termsLink: {
    color: Colors.primary,
    textDecorationLine: "underline",
  },
  signUpButton: {
    backgroundColor: Colors.primary,
    padding: 14,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 24,
  },
  signUpButtonText: {
    color: Colors.white,
    fontFamily: "Medium",
    fontSize: 15,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.lightGray,
  },
  dividerText: {
    fontFamily: "Regular",
    fontSize: 12,
    color: Colors.gray,
    marginHorizontal: 12,
  },
  socialButtonsContainer: {
    gap: 10,
  },
  socialButton: {
    borderWidth: 1,
    borderColor: Colors.lightGray,
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  socialButtonText: {
    fontFamily: "Regular",
    fontSize: 14,
    color: Colors.black,
  },
  socialIcon: {
    width: 18,
    height: 18,
    marginRight: 10,
  },
  signInContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  signInText: {
    fontFamily: "Regular",
    color: Colors.gray,
    fontSize: 13,
    marginRight: 4,
  },
  signInLink: {
    fontFamily: "Medium",
    color: Colors.primary,
    fontSize: 13,
  },
});
