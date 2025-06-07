import { StyleSheet, View } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import { ThemedText } from "@/components/ThemedText";
import Content from "@/components/Content";
import { useUser } from "@/context/UserContext";
import TasksOverview from "@/pages/home/TasksOverview";
import { Link } from "expo-router";
import ProfileButton from "@/components/ProfileButton";

export default function HomeScreen() {
	const { user } = useUser();

	return (
		<Content>
			<View className="flex-row items-center justify-between gap-5 mt-10">
				<View style={styles.titleContainer}>
					{user?.name ? (
						<ThemedText type="title">Hey {user?.name}</ThemedText>
					) : (
						<ThemedText type="title">Keep Track</ThemedText>
					)}

					{user?.name && <HelloWave />}
				</View>
				<View>
					<Link href={"/(sheets)/profile"}>
						<ProfileButton />
					</Link>
				</View>
			</View>
			<TasksOverview showTitle />
		</Content>
	);
}

const styles = StyleSheet.create({
	titleContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
});
