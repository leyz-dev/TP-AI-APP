import Button from "@/components/Button";
import { useMessage } from "@/hooks/useMessage";
import { ScrollView, View } from "react-native";

const ToastDemo = () => {
  const { success, error } = useMessage();

  return (
    <ScrollView>
      <View style={{ gap: 16, padding: 16 }}>
        <Button
          label="Show Success Toast"
          onPress={() => success("Trip created successfully.")}
        />

        <Button
          label="Show Error Toast"
          onPress={() => error("Something went wrong.")}
        />
      </View>
    </ScrollView>
  );
};

export default ToastDemo;
