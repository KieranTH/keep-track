import Content from "@/components/Content";
import { ThemedText } from "@/components/ThemedText";
import TasksOverview from "@/pages/home/TasksOverview";
import { Text, View } from "react-native";

const TasksScreen = () => {
	return (
		<Content applySafeMargin={false}>
			<ThemedText type="title">Tasks</ThemedText>
			<TasksOverview />
		</Content>
	);
};

export default TasksScreen;
