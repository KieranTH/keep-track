import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../tailwind.config.js";
import { ThemedText, ThemedTextProps } from "./ThemedText";

export type CopyTextProps = ThemedTextProps;

const CopyText = ({ ...props }: CopyTextProps) => {
  const fullConfig = resolveConfig(tailwindConfig);

  return (
    <ThemedText
      //   @ts-ignore
      lightColor={fullConfig.theme.colors["copy-light"]}
      //   @ts-ignore
      darkColor={fullConfig.theme.colors["copy-dark"]}
      {...props}
    />
  );
};

export default CopyText;
