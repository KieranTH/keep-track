import { View, type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../tailwind.config.js";

export type BackgroundViewProps = ViewProps;

export function BackgroundView({ style, ...otherProps }: BackgroundViewProps) {
	const fullConfig = resolveConfig(tailwindConfig);

	const backgroundColor = useThemeColor(
		{
			// @ts-ignore
			light: fullConfig.theme.colors["background-light"],
			// @ts-ignore
			dark: fullConfig.theme.colors["background-dark"],
		},
		"background",
	);

	return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
