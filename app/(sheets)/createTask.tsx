import { useUserSetup } from "@/hooks/useStorage";
import AddTaskSheet from "@/sheets/AddTaskSheet";
import UserSheet from "@/sheets/UserSheet";
import { router } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";

export default function CreateTaskScreen() {
	const onComplete = () => {
		router.navigate("../");
	};

	return (
		<View className="p-4 mt-10">
			<AddTaskSheet onComplete={onComplete} />
		</View>
	);
}
