import ThemedInput from "@/components/ThemedInput";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useUserDB } from "@/database/hooks";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ColorPicker, {
  Panel1,
  Swatches,
  Preview,
  OpacitySlider,
  HueSlider,
  returnedResults,
} from "reanimated-color-picker";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../tailwind.config.js";
import Button from "@/components/Button";
import { useUser } from "@/context/UserContext";
import { useUserSetup } from "@/hooks/useStorage";
import { STORAGE_KEYS } from "@/storage/keys";
import { router } from "expo-router";

type UserSheetType = {
  onCompleted: () => void;
};
const UserSheet = ({ onCompleted }: UserSheetType) => {
  const { addUser, updateUser } = useUserDB();
  const { setUser, user } = useUser();

  const primaryDefault = // @ts-ignore
    resolveConfig(tailwindConfig).theme.colors.primary as string;

  const [name, setName] = useState(user?.name ?? "");
  const [colour, setColour] = useState<string>(user?.colour ?? primaryDefault);

  const onSave = () => {
    if (user?.id) {
      updateUser(user.id, name, colour).then((users) => {
        if (users[0]) {
          setUser(users[0]);
          setName(users[0].name ?? "");
          onCompleted();
        }
      });
    } else {
      addUser(name, colour).then((users) => {
        if (users[0]) {
          setUser(users[0]);
          setName(users[0].name ?? "");
          onCompleted();
        }
      });
    }

    router.navigate("../");
  };

  const onColourChange = (colour: returnedResults) => {
    setColour(colour.hex);
  };

  const onResetColour = () => {
    setColour(primaryDefault);
  };

  return (
    <View style={styles.container}>
      <ThemedText type="title">Personalisation</ThemedText>
      <ThemedView style={styles.content}>
        <ThemedText type="subtitle">Display Name</ThemedText>
        <ThemedInput placeholder="Kieran" value={name} onChangeText={setName} />
      </ThemedView>
      <ThemedView style={styles.content}>
        <View className="flex-row justify-between items-center w-full gap-5">
          <ThemedText type="subtitle">Display Colour</ThemedText>
          <Button
            className="p-2 border"
            style={{
              borderColor: colour,
            }}
            onPress={onResetColour}
          >
            <Text style={{ color: colour }}>Reset</Text>
          </Button>
        </View>
        <ColorPicker
          style={{ width: "100%", gap: 20 }}
          value={colour}
          onComplete={onColourChange}
        >
          <View>
            <ThemedText type="defaultSemiBold">Selected</ThemedText>
            <Preview hideInitialColor hideText />
          </View>
          <Swatches />
        </ColorPicker>
      </ThemedView>

      <Button
        className="p-4"
        style={{
          backgroundColor: colour,
        }}
        onPress={onSave}
      >
        <ThemedText type={"subtitle"}>Save</ThemedText>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  content: {
    flexDirection: "column",
    gap: 10,
    justifyContent: "center",
    padding: 20,
    borderRadius: 10,
  },
});

export default UserSheet;
