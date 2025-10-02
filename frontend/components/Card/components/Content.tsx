import { ReactNode } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { baseStyles } from "../styles";

interface Props {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const Content = ({ children, style }: Props) => {
  return <View style={[baseStyles.content, style]}>{children}</View>;
};

export default Content;
