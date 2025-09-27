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
} from "react-native";
import facebook from "../../../assets/images/facebook.png";
import google from "../../../assets/images/google.png";

export default function SignIn() {
  const [rememberMe, setRememberMe] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View style={styles.container}>
      {/* Header Section */}

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Sign In</Text>
        <View style={styles.circle1}></View>
        <View style={styles.circle2}></View>
        <View style={styles.circle3}></View>
      </View>

      {/* Form Section */}
      <View style={styles.formContainer}>
        <Text style={styles.welcomeTitle}>Welcome Back!</Text>
        <Text style={styles.subtitle}>
          To keep connected with us please login with your personal info
        </Text>

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

        {/* Remember Me & Forgot Password */}
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
            <Text style={styles.rememberText}>Remember me!</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* Sign In Button */}
        <TouchableOpacity style={styles.signInButton}>
          <Text style={styles.signInButtonText}>Sign In</Text>
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
            <Text style={styles.socialButtonText}>Sign In with Facebook</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={google}
              style={styles.socialIcon}
              resizeMode="contain"
            />
            <Text style={styles.socialButtonText}>Sign in with Google</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Don't have an account?</Text>
          <TouchableOpacity>
            <Text style={styles.signUpLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    height: 200,
    width: "100%",
    backgroundColor: Colors.primary,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    paddingBottom: 24,
    paddingLeft: 24,
    overflow: "hidden",
    position: "relative",
  },
  // Wavy Circles
  circle1: {
    position: "absolute",
    top: -50,
    right: -30,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: Colors.accent,
    opacity: 0.15,
  },
  circle2: {
    position: "absolute",
    top: -80,
    right: 20,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.secondary,
    opacity: 0.2,
  },
  circle3: {
    position: "absolute",
    top: -40,
    right: -60,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: Colors.accent,
    opacity: 0.1,
  },
  headerTitle: {
    color: Colors.white,
    fontFamily: "Bold",
    fontSize: 32,
    marginBottom: 8,
    zIndex: 1,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    backgroundColor: Colors.white,
    borderRadius: 24,
    marginTop: -20,
  },
  welcomeTitle: {
    fontFamily: "Bold",
    fontSize: 24,
    color: Colors.black,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: "Regular",
    fontSize: 16,
    color: Colors.gray,
    marginBottom: 32,
    lineHeight: 22,
  },
  inputContainer: {
    marginBottom: 20,
  },

  input: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: Colors.lightGray,
    fontFamily: "Regular",
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rememberMeText: {
    fontFamily: "Regular",
    fontSize: 14,
    color: Colors.gray,
    marginLeft: 8,
  },
  forgotPassword: {
    fontFamily: "Regular",
    fontSize: 14,
    color: Colors.primary,
  },
  signInButton: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 99,
    alignItems: "center",
    marginBottom: 32,
  },
  signInButtonText: {
    color: Colors.white,
    fontFamily: "Medium",
    fontSize: 16,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.lightGray,
  },
  dividerText: {
    fontFamily: "Regular",
    fontSize: 14,
    color: Colors.gray,
    marginHorizontal: 16,
  },
  socialButtonsContainer: {
    gap: 12,
  },
  socialButton: {
    borderWidth: 1,
    borderColor: Colors.lightGray,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  socialButtonText: {
    fontFamily: "Regular",
    fontSize: 16,
    color: Colors.black,
  },
  icon: {
    marginRight: 12,
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
  rememberContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 4,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  checkmark: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: "bold",
  },
  rememberText: {
    fontFamily: "Regular",
    fontSize: 14,
    color: Colors.gray,
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
    marginBottom: 12,
  },
  signUpText: { fontFamily: "Regular", color: Colors.gray, marginRight: 4 },
  signUpLink: { fontFamily: "Medium", color: Colors.primary, marginBottom: 24 },
});
