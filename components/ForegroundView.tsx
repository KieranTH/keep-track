import { View, type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../tailwind.config.js";

export type ForegroundViewProps = ViewProps;

const ForegroundView = ({ style, ...otherProps }: ForegroundViewProps) => {
  const fullConfig = resolveConfig(tailwindConfig);

  const backgroundColor = useThemeColor(
    {
      // @ts-ignore
      light: fullConfig.theme.colors["foreground-light"],
      // @ts-ignore
      dark: fullConfig.theme.colors["foreground-dark"],
    },
    "background"
  );

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
};

export default ForegroundView;
