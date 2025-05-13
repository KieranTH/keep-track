import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../tailwind.config.js";
import Button, { type ButtonProps } from "./Button";
import ThemedButton from "./ThemedButton";

export type BackgroundInputProps = ButtonProps;

const BackgroundButton = (props: BackgroundInputProps) => {
	const fullConfig = resolveConfig(tailwindConfig);

	return (
		<ThemedButton
			{...props}
			//   @ts-ignore
			lightColor={fullConfig.theme.colors["background-light"]}
			//   @ts-ignore
			darkColor={fullConfig.theme.colors["background-dark"]}
		/>
	);
};

export default BackgroundButton;
