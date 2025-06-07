import Content from "@/components/Content";
import { ThemedText } from "@/components/ThemedText";
import { Shopping } from "@/pages/shopping/Shopping";
import { Text } from "react-native";

const ShoppingScreen = () => {
	return (
		<Content>
			<ThemedText type="title">Shopping</ThemedText>
			<Shopping />
		</Content>
	);
};

export default ShoppingScreen;
