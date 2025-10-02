// Input.tsx
import React, {
  forwardRef,
  ReactNode,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  Pressable,
  StyleProp,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { COLORS, SIZES } from "./constants";
import { styles } from "./styles";
import { InputRef, NumericKind, Size, Variant } from "./types";
import { allowDec, allowInt, clamp } from "./utils";

export interface InputProps {
  // Controlled
  value?: string;
  onChangeText?: (text: string) => void;

  // Uncontrolled
  defaultValue?: string;

  // Common UX
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorText?: string;
  disabled?: boolean; // #TODO: Add UI indicator for disabled
  editable?: boolean; // NOTE: editable and disabled function the same, if we need to support both (Edit later)
  required?: boolean;

  // Appearance
  variant?: Variant;
  size?: Size;

  // Behavior
  multiline?: boolean;
  numberOfLines?: number;
  maxLength?: number;
  showCounter?: boolean;
  secureTextEntry?: boolean;
  autoCapitalize?: TextInputProps["autoCapitalize"];
  keyboardType?: TextInputProps["keyboardType"];
  returnKeyType?: TextInputProps["returnKeyType"];

  // Numeric
  numeric?: NumericKind;
  onChangeNumber?: (num: number | null) => void;
  min?: number;
  max?: number;
  precision?: number;
  allowNegative?: boolean;

  // Adornments
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  showClear?: boolean;

  // Events
  onFocus?: TextInputProps["onFocus"];
  onBlur?: TextInputProps["onBlur"];
  onSubmitEditing?: TextInputProps["onSubmitEditing"];

  // Style overrides
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  helperStyle?: StyleProp<TextStyle>;
  errorStyle?: StyleProp<TextStyle>;

  // Testing & a11y
  testID?: string;
  accessibilityLabel?: string;
}

const Input = forwardRef<InputRef, InputProps>((props, ref) => {
  const {
    value,
    onChangeText,
    defaultValue = "",
    label,
    placeholder,
    helperText,
    errorText,
    disabled = false,
    editable,
    required,
    variant = "outline",
    size = "md",
    multiline = false,
    numberOfLines,
    maxLength,
    showCounter = false,
    secureTextEntry,
    autoCapitalize = "none",
    keyboardType,
    returnKeyType,
    numeric,
    onChangeNumber,
    min,
    max,
    precision,
    allowNegative = true,
    leftIcon,
    rightIcon,
    showClear = false,
    onFocus,
    onBlur,
    onSubmitEditing,
    style,
    inputStyle,
    labelStyle,
    helperStyle,
    errorStyle,
    testID,
    accessibilityLabel,
  } = props;

  const inputRef = useRef<TextInput>(null);
  const [innerValue, setInnerValue] = useState(defaultValue);
  const [isFocused, setIsFocused] = useState(false);
  const [hide, setHide] = useState(!!secureTextEntry);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : innerValue;

  const s = SIZES[size];
  const isError = !!errorText;
  const isEditable = editable ?? !disabled;

  // Choose keyboard if not provided
  const resolvedKeyboard: TextInputProps["keyboardType"] =
    keyboardType ??
    (numeric === "integer"
      ? "number-pad"
      : numeric === "decimal"
      ? "decimal-pad"
      : undefined);

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    blur: () => inputRef.current?.blur(),
    clear: () => {
      inputRef.current?.clear();
      if (!isControlled) setInnerValue("");
      onChangeText?.("");
      onChangeNumber?.(null);
    },
  }));

  const handleFocus: TextInputProps["onFocus"] = e => {
    setIsFocused(true);
    onFocus?.(e);
  };

  // onBlur: clamp + precision (for numeric)
  const handleBlur: TextInputProps["onBlur"] = e => {
    setIsFocused(false);
    if (numeric) {
      const raw = (isControlled ? value : innerValue) ?? "";
      const n = Number(raw);
      if (Number.isFinite(n)) {
        let out = clamp(n, min, max);
        if (precision !== undefined && numeric === "decimal") {
          const factor = Math.pow(10, precision);
          out = Math.round(out * factor) / factor;
        }
        const nextText = String(out);
        if (!isControlled) setInnerValue(nextText);
        onChangeText?.(nextText);
        onChangeNumber?.(out);
      } else {
        // empty/invalid -> null
        onChangeNumber?.(null);
      }
    }
    onBlur?.(e);
  };

  const handleChange = (next: string) => {
    if (numeric) {
      const ok =
        numeric === "integer"
          ? allowInt(next, allowNegative)
          : allowDec(next, allowNegative);
      if (!ok) return; // reject disallowed char
    }

    if (!isControlled) setInnerValue(next);
    onChangeText?.(next);

    if (onChangeNumber) {
      const parsed =
        next === "" || next === "-" || next === "." || next === "-."
          ? null
          : Number(next);
      onChangeNumber(
        Number.isFinite(parsed as number) ? (parsed as number) : null
      );
    }
  };

  const handleClear = () => {
    if (!isControlled) setInnerValue("");
    onChangeText?.("");
    onChangeNumber?.(null);
    inputRef.current?.focus();
  };

  const containerStyles: StyleProp<ViewStyle> = [styles.fieldContainer, style];

  const frameStyles = [
    styles.frameBase,
    {
      paddingVertical: s.padV,
      paddingHorizontal: s.padH,
      borderRadius: s.radius,
      backgroundColor: variant === "filled" ? COLORS.filledBg : COLORS.bg, // NOTE: May want to modify filled BG later on
      borderWidth: variant === "outline" ? 1 : 0,
      borderColor: isError
        ? COLORS.error
        : isFocused
        ? COLORS.focus
        : COLORS.border,
      opacity: disabled ? 0.7 : 1,
    },
  ];

  const textInputStyles: StyleProp<TextStyle> = {
    flex: 1,
    color: isEditable ? COLORS.text : COLORS.disabledText,
    fontSize: s.fontSize,
  };

  const adornGap = { columnGap: s.gap };

  return (
    <View style={containerStyles}>
      {label ? (
        <Text
          style={[
            {
              fontSize: s.label,
              color: isError ? COLORS.error : COLORS.subtext,
              marginLeft: 2,
            },
            labelStyle,
          ]}
        >
          {label}
          {required ? " *" : ""}
        </Text>
      ) : null}

      <Pressable
        accessibilityRole="button"
        onPress={() => inputRef.current?.focus()}
        style={({ pressed }) => [
          frameStyles,
          pressed ? { opacity: 0.95 } : null,
        ]}
      >
        <View style={[styles.row, adornGap]}>
          {leftIcon ? <View style={styles.iconWrap}>{leftIcon}</View> : null}

          <TextInput
            ref={inputRef}
            value={currentValue}
            onChangeText={handleChange}
            placeholder={placeholder}
            placeholderTextColor={COLORS.placeholder}
            editable={isEditable}
            secureTextEntry={hide}
            autoCapitalize={autoCapitalize}
            keyboardType={resolvedKeyboard}
            returnKeyType={returnKeyType}
            multiline={multiline}
            numberOfLines={multiline ? numberOfLines : 1}
            maxLength={maxLength}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onSubmitEditing={onSubmitEditing}
            textAlignVertical={multiline ? "top" : "center"}
            style={[textInputStyles, inputStyle]}
            testID={testID}
            accessible
            accessibilityLabel={accessibilityLabel ?? label ?? placeholder}
          />

          {/* Right controls: clear, toggle, custom icon */}
          <View style={[styles.row, { columnGap: 8 }]}>
            {showClear && (currentValue?.length || 0) > 0 && isEditable ? (
              <Pressable
                onPress={handleClear}
                hitSlop={8}
                accessibilityLabel="Clear input"
              >
                <Text style={styles.actionText}>✕</Text>
              </Pressable>
            ) : null}

            {secureTextEntry ? (
              <Pressable
                onPress={() => setHide(v => !v)}
                hitSlop={8}
                accessibilityLabel={hide ? "Show password" : "Hide password"}
              >
                <Text style={styles.actionText}>{hide ? "👁️" : "🙈"}</Text>
              </Pressable>
            ) : null}

            {rightIcon ? (
              <View style={styles.iconWrap}>{rightIcon}</View>
            ) : null}
          </View>
        </View>
      </Pressable>

      {/* Helper / Error / Counter */}
      <View style={styles.footerRow}>
        {errorText ? (
          <Text style={[styles.errorText, errorStyle]}>{errorText}</Text>
        ) : helperText ? (
          <Text style={[styles.helperText, helperStyle]}>{helperText}</Text>
        ) : (
          <View />
        )}

        {showCounter && typeof maxLength === "number" ? (
          <Text style={styles.counterText}>
            {(currentValue ?? "").length}/{maxLength}
          </Text>
        ) : null}
      </View>
    </View>
  );
});

export default Input;
