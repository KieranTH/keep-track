import { StyleSheet, type TextProps } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedIconProps = TextProps & {
	lightColor?: string;
	darkColor?: string;
	type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
	name: string;
	size?: number;
};

export function ThemedIcon({
	lightColor,
	darkColor,
	type = "default",
	style,
	...rest
}: ThemedIconProps) {
	const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

	return (
		// @ts-ignore
		<Ionicons
			style={[
				{ color },
				type === "default" ? styles.default : undefined,
				type === "title" ? styles.title : undefined,
				type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
				type === "subtitle" ? styles.subtitle : undefined,
				type === "link" ? styles.link : undefined,
				style,
			]}
			{...rest}
		/>
	);
}

const styles = StyleSheet.create({
	default: {},
	defaultSemiBold: {
		fontWeight: "600",
	},
	title: {
		fontWeight: "bold",
	},
	subtitle: {
		fontWeight: "bold",
	},
	link: {
		color: "#0a7ea4",
	},
});
