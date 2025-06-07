import Content from "@/components/Content";
import { ThemedText } from "@/components/ThemedText";
import TasksOverview from "@/pages/home/TasksOverview";
import { Reminders } from "@/pages/reminders/Reminders";
import { Text } from "react-native";

const TasksScreen = () => {
	return (
		<Content applySafeMargin={false}>
			<ThemedText type="title">Reminders</ThemedText>
			<Reminders />
		</Content>
	);
};

export default TasksScreen;
