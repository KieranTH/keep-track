import Content from "@/components/Content";
import { ThemedText } from "@/components/ThemedText";
import { Tasks } from "@/pages/tasks/Tasks";

const TasksScreen = () => {
	return (
		<Content applySafeMargin={false}>
			<ThemedText type="title">Tasks</ThemedText>
			<Tasks />
		</Content>
	);
};

export default TasksScreen;
