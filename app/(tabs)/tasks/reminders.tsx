import Content from "@/components/Content";
import { ThemedText } from "@/components/ThemedText";
import TasksOverview from "@/pages/home/TasksOverview";
import { Text } from "react-native";

const TasksScreen = () => {
	return (
		<Content>
			<ThemedText type="title">Reminders</ThemedText>
			<TasksOverview />
		</Content>
	);
};

export default TasksScreen;
