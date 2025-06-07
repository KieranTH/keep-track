import { ThemedText } from "@/components/ThemedText";
import { StyleSheet, TextInput, View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { BackgroundInput } from "@/components/BackgroundInput";
import Button from "@/components/Button";
import BackgroundButton from "@/components/BackgroundButton";
import { ThemedIcon } from "@/components/ThemedIcon";
import { useReminderFunctions } from "@/database/reminders";

type Inputs = {
	title: string;
	description?: string;
};

type AddReminderSheetProps = {
	onComplete: () => void;
};

const AddReminderSheet = ({ onComplete }: AddReminderSheetProps) => {
	const { addReminder } = useReminderFunctions();
	const onSave = (data: Inputs) => {
		if (data.title) {
			addReminder(data)
				.then(() => {
					console.log("created");
					onComplete();
				})
				.catch((e) => {
					console.log("error", e);
				});
		}
	};

	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<Inputs>({});

	return (
		<View style={styles.container}>
			<ThemedText type="title">Create Reminder</ThemedText>
			<View style={styles.content}>
				<View className="gap-2">
					<ThemedText type="subtitle">Title</ThemedText>
					<Controller
						name="title"
						control={control}
						rules={{ required: true }}
						render={({ field: { onChange } }) => (
							<BackgroundInput
								placeholder="Tidy up!"
								onChangeText={onChange}
								error={!!errors.title}
							/>
						)}
					/>
				</View>
				<View className="gap-2">
					<ThemedText type="subtitle">Description</ThemedText>
					<Controller
						name="description"
						control={control}
						render={({ field: { onChange } }) => (
							<BackgroundInput
								placeholder="Something... Something..."
								onChangeText={onChange}
								error={!!errors.description}
							/>
						)}
					/>
				</View>
				<BackgroundButton onPress={handleSubmit(onSave)} className="mt-auto">
					<ThemedIcon name={"checkmark-circle"} size={18} />
					<ThemedText type="defaultSemiBold">Save</ThemedText>
				</BackgroundButton>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		gap: 30,
		flex: 1,
	},
	content: {
		flexDirection: "column",
		gap: 20,
		justifyContent: "center",
	},
});

export default AddReminderSheet;
