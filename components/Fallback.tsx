import { ActivityIndicator, View } from "react-native";
import { ThemedText } from "./ThemedText";

const Fallback = () => {
	return (
		<View className="flex-1 justify-center items-center gap-5 flex-col">
			<ActivityIndicator size="large" color="#0000ff" />
			<ThemedText>Loading...</ThemedText>
		</View>
	);
};

export default Fallback;
