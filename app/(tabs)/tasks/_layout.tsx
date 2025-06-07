import { MaterialTopTabs } from "@/layouts/material-top-tabs";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Layout() {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<MaterialTopTabs
				screenOptions={
					{
						// API Reference: https://reactnavigation.org/docs/material-top-tab-navigator#options
					}
				}
			>
				<MaterialTopTabs.Screen name={"index"} options={{ title: "Tasks" }} />
				<MaterialTopTabs.Screen
					name={"reminders"}
					options={{ title: "Reminders" }}
				/>
			</MaterialTopTabs>
		</SafeAreaView>
	);
}
