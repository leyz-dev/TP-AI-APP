// Card.tsx
import React, { ReactNode } from "react";
import {
  Pressable,
  PressableProps,
  StyleProp,
  View,
  ViewStyle,
} from "react-native";
import Content from "./components/Content";
import Divider from "./components/Divider";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { TOKENS } from "./constants";
import { baseStyles } from "./styles";
import { Size, Variant } from "./types";
import { getShadow, overlayColor } from "./utils";

interface CardProps {
  children?: ReactNode;

  // Interactivity (makes the whole card tappable)
  onPress?: () => void;
  pressableProps?: Omit<PressableProps, "onPress" | "children">;
  disabled?: boolean; // #TODO: Disabled has no UI indicator its disable

  // Appearance
  variant?: Variant;
  size?: Size;
  radius?: number;
  elevation?: number;

  // Style overrides
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;

  // Accessibility & test
  accessibilityLabel?: string;
  testID?: string;
}

// Root Card
const CardBase = ({
  children,
  onPress,
  pressableProps,
  disabled = false,
  variant = "elevated",
  size = "md",
  radius,
  elevation,
  style,
  contentStyle,
  accessibilityLabel,
  testID,
}: CardProps) => {
  const pad = TOKENS.pad[size];
  const rad = radius ?? TOKENS.radius[size];

  const isPressable = typeof onPress === "function" && !disabled;

  // default elevation by variant
  const defaultElev = variant === "elevated" ? 3 : 0;
  const elev = elevation ?? defaultElev;

  const frame: StyleProp<ViewStyle> = [
    baseStyles.card,
    variant === "outlined" && baseStyles.outlined,
    variant === "filled" && baseStyles.filled,
    { borderRadius: rad, padding: pad },
    getShadow(elev),
    style,
  ];

  if (isPressable) {
    return (
      <Pressable
        {...pressableProps}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        testID={testID}
        disabled={disabled}
        onPress={onPress}
        android_ripple={{ color: TOKENS.color.press }}
        style={({ pressed }) => [
          frame,
          pressed ? { backgroundColor: overlayColor(variant) } : null,
        ]}
      >
        <View style={contentStyle}>{children}</View>
      </Pressable>
    );
  }

  return (
    <View
      accessibilityRole="summary"
      accessibilityLabel={accessibilityLabel}
      testID={testID}
      style={frame}
    >
      <View style={contentStyle}>{children}</View>
    </View>
  );
};

const Card = Object.assign(CardBase, {
  Header,
  Content,
  Footer,
  Divider,
});

export default Card;
