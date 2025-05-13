import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../tailwind.config.js";
import { ThemedIcon, type ThemedIconProps } from "./ThemedIcon";

export type PrimaryIconProps = ThemedIconProps;

const PrimaryIcon = ({ ...props }: PrimaryIconProps) => {
	const fullConfig = resolveConfig(tailwindConfig);

	return (
		<ThemedIcon
			//   @ts-ignore
			lightColor={fullConfig.theme.colors["primary-light"]}
			//   @ts-ignore
			darkColor={fullConfig.theme.colors["primary-dark"]}
			{...props}
		/>
	);
};

export default PrimaryIcon;
