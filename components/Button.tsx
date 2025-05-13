import { Pressable, View, type StyleProp, type ViewStyle } from "react-native";
import { twMerge } from "tailwind-merge";

export type ButtonProps = {
	children: React.ReactNode;
	className?: string;
	onPress?: () => void;
	style?: StyleProp<ViewStyle>;
};
const Button = ({ children, className, onPress, style }: ButtonProps) => {
	return (
		<Pressable onPress={onPress}>
			<View
				className={twMerge(
					"p-4 rounded-lg justify-center items-center flex-row gap-2",
					className,
				)}
				style={style}
			>
				{children}
			</View>
		</Pressable>
	);
};

export default Button;
