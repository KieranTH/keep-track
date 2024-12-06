import { StyleSheet } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Content from "@/components/Content";
import { useUser } from "@/database/hooks";

export default function HomeScreen() {
  const { user } = useUser();

  return (
    <Content>
      <ThemedView style={styles.titleContainer} className="mt-10">
        <ThemedText type="title">Welcome {user?.name}</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView>
        <ThemedText>Here are your Tasks! Master em 😉</ThemedText>
        <ThemedText>TASKS TODO:</ThemedText>
        <ThemedText>SHOPPING TODO:</ThemedText>
        <ThemedText>REMINDERS TODO:</ThemedText>
      </ThemedView>
    </Content>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
