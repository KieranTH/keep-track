import { useThemeColor } from "@/hooks/useThemeColor";
import Button, { type ButtonProps } from "./Button";

type ThemedButtonProps = ButtonProps & {
	lightColor?: string;
	darkColor?: string;
};

const ThemedButton = ({
	style,
	lightColor,
	darkColor,
	...otherProps
}: ThemedButtonProps) => {
	const backgroundColor = useThemeColor(
		{ light: lightColor, dark: darkColor },
		"background",
	);

	return <Button style={[{ backgroundColor }, style]} {...otherProps} />;
};

export default ThemedButton;
