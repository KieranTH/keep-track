import { useUserSetup } from "@/hooks/useStorage";
import UserSheet from "@/sheets/UserSheet";
import { useEffect } from "react";
import { View } from "react-native";

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
		<View className="p-4 mt-10">
			<UserSheet onCompleted={onComplete} />
		</View>
	);
}
