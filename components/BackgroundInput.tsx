import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../tailwind.config.js";
import ThemedInput, { ThemedInputProps } from "./ThemedInput";

export type BackgroundInputProps = ThemedInputProps;

export function BackgroundInput(props: BackgroundInputProps) {
  const fullConfig = resolveConfig(tailwindConfig);

  return (
    <ThemedInput
      {...props}
      //   @ts-ignore
      lightColor={fullConfig.theme.colors["background-light"]}
      //   @ts-ignore
      darkColor={fullConfig.theme.colors["background-dark"]}
    />
  );
}
