import Button from "@/components/Button";
import { MaterialIcons } from "@expo/vector-icons"; // optional
import { ScrollView, Text, View } from "react-native";

const ButtonDemo = () => {
  return (
    <ScrollView>
      <View style={{ gap: 16, padding: 16 }}>
        <Button label="Primary" />
        <Button label="Secondary" variant="secondary" />
        <Button label="Outline" variant="outline" />
        <Button label="Ghost" variant="ghost" />
        <Button label="Disabed" disabled />

        <Button label="Small" size="sm" />
        <Button label="Medium" size="md" />
        <Button label="Large" size="lg" />
        <Button loading />

        <Button
          label="LeftIcon"
          leftIcon={<MaterialIcons name="add" size={16} color="#FFFFFF" />}
        />
        <Button
          label="LeftIcon"
          rightIcon={<MaterialIcons name="delete" size={16} color="#FFFFFF" />}
        />

        <Button label="Custom Content">
          <View style={{ flexDirection: "row", gap: 6 }}>
            <MaterialIcons name="add" size={16} />
            <Text>Ghost (custom children)</Text>
          </View>
        </Button>
      </View>
    </ScrollView>
  );
};

export default ButtonDemo;
