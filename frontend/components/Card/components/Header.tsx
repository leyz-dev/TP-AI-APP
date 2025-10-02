import { ReactNode } from "react";
import { StyleProp, Text, TextStyle, View, ViewStyle } from "react-native";
import { baseStyles } from "../styles";

export interface Props {
  title?: string;
  subtitle?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  subtitleStyle?: StyleProp<TextStyle>;
}

const Header = ({
  title,
  subtitle,
  leading,
  trailing,
  style,
  titleStyle,
  subtitleStyle,
}: Props) => {
  return (
    <View style={[baseStyles.headerWrap, style]}>
      <View style={[baseStyles.row, { columnGap: 12 }]}>
        {leading ? <View>{leading}</View> : null}

        <View style={baseStyles.headerTexts}>
          {title ? (
            <Text style={[baseStyles.title, titleStyle]} numberOfLines={1}>
              {title}
            </Text>
          ) : null}
          {subtitle ? (
            <Text
              style={[baseStyles.subtitle, subtitleStyle]}
              numberOfLines={2}
            >
              {subtitle}
            </Text>
          ) : null}
        </View>

        {trailing ? <View>{trailing}</View> : null}
      </View>
    </View>
  );
};

export default Header;
