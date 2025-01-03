import { useThemeColor } from "@/hooks/useThemeColor";
import clsx from "clsx";
import { TextInput, TextInputProps } from "react-native";
import { twMerge } from "tailwind-merge";

export type ThemedInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  error?: boolean;
};

const ThemedInput = ({
  style,
  lightColor,
  darkColor,
  error = false,
  ...otherProps
}: ThemedInputProps) => {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  const textColor = useThemeColor({}, "text");

  return (
    <TextInput
      style={[
        {
          backgroundColor,
          padding: 14,
          borderRadius: 10,
          fontSize: 18,
          color: textColor,
        },
        style,
      ]}
      className={twMerge(
        "border border-border-light dark:border-border-dark",
        error && "border-error dark:border-error"
      )}
      {...otherProps}
    />
  );
};

export default ThemedInput;
