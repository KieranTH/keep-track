import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../tailwind.config.js";
import { ThemedText, ThemedTextProps } from "./ThemedText";

export type PrimaryTextProps = ThemedTextProps;

const PrimaryText = ({ ...props }: PrimaryTextProps) => {
  const fullConfig = resolveConfig(tailwindConfig);

  return (
    <ThemedText
      //   @ts-ignore
      lightColor={fullConfig.theme.colors["primary-light"]}
      //   @ts-ignore
      darkColor={fullConfig.theme.colors["primary-dark"]}
      {...props}
    />
  );
};

export default PrimaryText;
