import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../tailwind.config.js";
import { ThemedText, ThemedTextProps } from "./ThemedText";

export type PrimaryContentTextProps = ThemedTextProps;

const PrimaryContentText = ({ ...props }: PrimaryContentTextProps) => {
  const fullConfig = resolveConfig(tailwindConfig);

  return (
    <ThemedText
      //   @ts-ignore
      lightColor={fullConfig.theme.colors["primary-content"]}
      //   @ts-ignore
      darkColor={fullConfig.theme.colors["primary-content"]}
      {...props}
    />
  );
};

export default PrimaryContentText;
