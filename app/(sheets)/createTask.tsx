import AddTaskSheet from "@/sheets/AddTaskSheet";
import { router } from "expo-router";
import { KeyboardAvoidingView, Platform, View } from "react-native";

export default function CreateTaskScreen() {
	const onComplete = () => {
		router.navigate("../");
	};

	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.OS === "ios" ? "padding" : undefined}
		>
			<View className="p-4 mt-10">
				<AddTaskSheet onComplete={onComplete} />
			</View>
		</KeyboardAvoidingView>
	);
}
