import ForegroundView from "@/components/ForegroundView";
import PrimaryButton from "@/components/PrimaryButton";
import PrimaryContentText from "@/components/PrimaryContentText";
import PrimaryIcon from "@/components/PrimaryIcon";
import PrimaryText from "@/components/PrimaryText";
import { ThemedText } from "@/components/ThemedText";
import { useShopping } from "@/database/shopping";
import { usePrimaryColour } from "@/hooks/usePrimaryColour";
import clsx from "clsx";
import { router } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";

export const Shopping = () => {
	const { lists } = useShopping({});
	const primaryColour = usePrimaryColour();

	const onAddHandler = () => {
		router.navigate("/(sheets)/createTask");
	};
	return (
		<ForegroundView className="rounded-xl p-4 gap-2">
			{lists.map((task) => (
				<Pressable key={task.id}>
					<View
						className={clsx(
							"flex-row gap-2 border border-primary p-4 rounded-lg",
							"bg-primary-light dark:bg-primary-dark",
						)}
						style={{
							borderColor: primaryColour,
							backgroundColor: primaryColour,
						}}
					>
						<PrimaryContentText type={"defaultSemiBold"}>
							{task.title}
						</PrimaryContentText>
					</View>
				</Pressable>
			))}
			<PrimaryButton onPress={onAddHandler} variant="outline">
				<PrimaryIcon
					name={"add-circle-outline"}
					type={"defaultSemiBold"}
					size={24}
				/>
				<PrimaryText type={"defaultSemiBold"}>Add New</PrimaryText>
			</PrimaryButton>
		</ForegroundView>
	);
};
