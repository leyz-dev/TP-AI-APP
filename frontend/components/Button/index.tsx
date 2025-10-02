// Button.tsx
import React, { ReactNode } from "react";
import {
  ActivityIndicator,
  Insets,
  Pressable,
  PressableProps,
  StyleProp,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { COLORS, SIZES, TEXT_COLORS } from "./constants";
import { styles, variantStyles } from "./styles";
import { Size, Variant } from "./types";

interface ButtonProps {
  // Prefer to pass semantic values and handlers
  label?: string; // If you want text without children
  children?: ReactNode; // If you want fully custom content
  onPress?: () => void;

  // UX state
  loading?: boolean;
  disabled?: boolean;

  // Appearance
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;

  // Adornments
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;

  // Accessibility & test
  accessibilityLabel?: string;
  testID?: string;

  // Style overrides
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  contentStyle?: StyleProp<ViewStyle>;

  // Touch tuning
  hitSlop?: Insets;

  // Pass-through to Pressable (except onPress/children)
  pressableProps?: Omit<PressableProps, "onPress" | "children">;
}

const Button = ({
  label,
  children,
  onPress,
  loading = false,
  disabled = false,
  variant = "primary",
  size = "md",
  leftIcon,
  rightIcon,
  accessibilityLabel,
  testID,
  style,
  textStyle,
  contentStyle,
  hitSlop,
  pressableProps,
}: ButtonProps) => {
  const s = SIZES[size];
  const isDisabled = disabled || loading;

  const baseContainer: ViewStyle = {
    paddingVertical: s.padV,
    paddingHorizontal: s.padH,
    borderRadius: s.radius,
  };

  const pressedStyle: ViewStyle =
    variant === "ghost" || variant === "outline"
      ? { opacity: 0.6 }
      : { transform: [{ scale: 0.98 }] };

  const gapStyle: ViewStyle = { columnGap: s.gap };

  const textBase: TextStyle = {
    color: isDisabled ? COLORS.disabledText : TEXT_COLORS[variant],
    fontSize: s.fontSize,
    lineHeight: s.lineHeight,
  };

  return (
    <Pressable
      {...pressableProps}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      testID={testID}
      disabled={isDisabled}
      hitSlop={hitSlop ?? { top: 8, bottom: 8, left: 8, right: 8 }}
      android_ripple={
        variant === "primary" || variant === "secondary"
          ? { color: "rgba(255,255,255,0.2)" }
          : undefined
      }
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        baseContainer,
        variantStyles[variant],
        isDisabled && styles.disabled,
        pressed ? pressedStyle : null,
        style,
      ]}
    >
      <View style={[styles.content, gapStyle, contentStyle]}>
        {loading ? (
          <ActivityIndicator size="small" color={textBase.color} />
        ) : (
          <>
            {leftIcon ? <View style={styles.iconWrap}>{leftIcon}</View> : null}

            {children ? (
              children
            ) : label ? (
              <Text
                numberOfLines={1}
                style={[styles.textBase, textBase, textStyle]}
              >
                {label}
              </Text>
            ) : null}

            {rightIcon ? (
              <View style={styles.iconWrap}>{rightIcon}</View>
            ) : null}
          </>
        )}
      </View>
    </Pressable>
  );
};

export default Button;
