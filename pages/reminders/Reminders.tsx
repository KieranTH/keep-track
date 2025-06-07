import ForegroundView from "@/components/ForegroundView";
import PrimaryButton from "@/components/PrimaryButton";
import PrimaryContentText from "@/components/PrimaryContentText";
import PrimaryIcon from "@/components/PrimaryIcon";
import PrimaryText from "@/components/PrimaryText";
import { useReminders } from "@/database/reminders";
import { usePrimaryColour } from "@/hooks/usePrimaryColour";
import clsx from "clsx";
import { router } from "expo-router";
import { Pressable, View } from "react-native";

export const Reminders = () => {
	const { reminders } = useReminders({});
	const primaryColour = usePrimaryColour();

	const onAddHandler = () => {
		router.navigate("/(sheets)/createReminder");
	};

	return (
		<ForegroundView className="rounded-xl p-4 gap-2">
			{reminders.map((reminder) => (
				<Pressable key={reminder.id}>
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
							{reminder.title}
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
