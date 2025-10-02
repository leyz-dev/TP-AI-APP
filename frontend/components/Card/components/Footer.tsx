import { ReactNode } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { baseStyles } from "../styles";

interface Props {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const Footer = ({ children, style }: Props) => {
  return <View style={[baseStyles.footer, style]}>{children}</View>;
};

export default Footer;
