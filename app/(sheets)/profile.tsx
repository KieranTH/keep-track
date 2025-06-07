import { useUserSetup } from "@/hooks/useStorage";
import UserSheet from "@/sheets/UserSheet";
import { useEffect } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

export default function ProfileScreen() {
	const { completeSetup } = useUserSetup();

	// On Unmount run setup complete
	useEffect(() => {
		return () => {
			completeSetup();
		};
	}, []);

	// on UserSheet completion run setup complete
	const onComplete = () => {
		completeSetup();
	};

	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.OS === "ios" ? "padding" : undefined}
		>
			<View style={{ flex: 1 }}>
				<ScrollView
					contentContainerStyle={{ flexGrow: 1 }}
					contentContainerClassName="p-4 mt-10 pb-10"
					keyboardShouldPersistTaps="handled"
				>
					<UserSheet onCompleted={onComplete} />
				</ScrollView>
			</View>
		</KeyboardAvoidingView>
	);
}
