import { useUser } from "@/context/UserContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../tailwind.config.js";
import { ThemedText } from "./ThemedText";

const ProfileButton = () => {
	const fullConfig = resolveConfig(tailwindConfig);

	const backgroundColor = useThemeColor(
		{
			// @ts-ignore
			light: fullConfig.theme.colors["foreground-light"],
			// @ts-ignore
			dark: fullConfig.theme.colors["foreground-dark"],
		},
		"background",
	);

	const iconColour = useThemeColor(
		{
			// @ts-ignore
			light: fullConfig.theme.colors["foreground-dark"],
			// @ts-ignore
			dark: fullConfig.theme.colors["foreground-light"],
		},
		"text",
	);

	const { user } = useUser();

	return (
		<View
			style={[{ backgroundColor }]}
			className="w-10 h-10 rounded-full border-copy-dark-light dark:border-copy-light-light border justify-center items-center"
		>
			{user ? (
				<ThemedText
					type={"subtitle"}
					style={{
						color: iconColour,
					}}
				>
					{user.name.charAt(0)}
				</ThemedText>
			) : (
				<Ionicons name={"person"} size={20} color={iconColour} />
			)}
		</View>
	);
};

export default ProfileButton;
