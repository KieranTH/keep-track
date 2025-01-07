import { StyleSheet, View } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Content from "@/components/Content";
import { useUser } from "@/context/UserContext";
import TasksOverview from "@/pages/home/TasksOverview";

export default function HomeScreen() {
  const { user } = useUser();

  return (
    <Content>
      <View style={styles.titleContainer} className="mt-10">
        <ThemedText type="title">Hey {user?.name}</ThemedText>
        <HelloWave />
      </View>
      <TasksOverview />
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
