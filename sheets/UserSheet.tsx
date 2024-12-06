import { useUser } from "@/database/hooks";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

type UserSheetType = {
  onCompleted: () => void;
};
const UserSheet = ({ onCompleted }: UserSheetType) => {
  const { addUser } = useUser();

  const [name, setName] = useState("");

  const onSave = () => {
    addUser(name).then(() => {
      setName("");
      onCompleted();
    });
  };

  return (
    <View style={styles.container}>
      <Text>Hey! It looks like you haven't set up your profile yet.</Text>
      <View style={styles.content}>
        <Text>Please enter your name to get started:</Text>
        <TextInput
          style={{ backgroundColor: "white", padding: 10, borderRadius: 10 }}
          placeholder="Kieran"
          onChangeText={setName}
        />
        <Button title="Save" onPress={onSave} disabled={!name.length} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  content: {
    flexDirection: "column",
    gap: 10,
    justifyContent: "center",
  },
});

export default UserSheet;
