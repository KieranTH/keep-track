import { usePrimaryColour } from "@/hooks/usePrimaryColour";
import Button, { type ButtonProps } from "./Button";
import type { StyleProp, ViewStyle } from "react-native";
import { twMerge } from "tailwind-merge";

type PrimaryButtonProps = ButtonProps & {
	variant?: "default" | "outline";
};
const PrimaryButton = ({
	children,
	onPress,
	variant = "default",
	...props
}: PrimaryButtonProps) => {
	const primaryColour = usePrimaryColour("light");

	const buttonStyle: StyleProp<ViewStyle> = {
		borderColor: variant === "outline" ? primaryColour : undefined,
		backgroundColor: variant === "default" ? primaryColour : undefined,
	};

	return (
		<Button
			{...props}
			className={twMerge("border", props.className)}
			style={buttonStyle}
			onPress={onPress}
		>
			{children}
		</Button>
	);
};

export default PrimaryButton;
