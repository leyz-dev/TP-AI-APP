import Input from "@/components/Input";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";

const InputDemo = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [qty, setQty] = useState("");
  const [qtyNum, setQtyNum] = useState<number | null>(null);

  return (
    <ScrollView>
      <View style={{ gap: 16, padding: 16 }}>
        <Input label="Small" size="sm" />
        <Input label="Medium" size="md" />
        <Input label="Large" size="lg" />

        <Input helperText="Helper Text" />
        <Input errorText="Field is required." />
        <Input label="Disabled" disabled />
        <Input label="Editable" editable={false} />
        <Input label="Title" required />

        <Input label="Outline" variant="outline" />
        <Input label="Filled" variant="filled" />

        <Input
          label="Email"
          placeholder="you@example.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          leftIcon={<MaterialIcons name="email" size={18} />}
          showClear
          helperText="We’ll never share your email."
        />

        <Input
          label="Password"
          placeholder="••••••••"
          value={pwd}
          onChangeText={setPwd}
          secureTextEntry
          leftIcon={<MaterialIcons name="lock" size={18} />}
          errorText={pwd.length > 0 && pwd.length < 6 ? "Too short" : ""}
        />

        <Input
          label="Note"
          multiline
          numberOfLines={4}
          maxLength={140}
          showCounter
        />
      </View>
    </ScrollView>
  );
};

export default InputDemo;
