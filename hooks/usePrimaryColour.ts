/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../tailwind.config.js";
import { useUser } from "@/context/UserContext";

export function usePrimaryColour(
  variant: "default" | "light" | "dark" = "default"
) {
  const { user } = useUser();

  const fullConfig = resolveConfig(tailwindConfig);
  // @ts-ignore
  const primary = fullConfig.theme.colors[
    variant === "default" ? "primary" : `primary-${variant}`
  ] as string;

  if (user?.colour) {
    return user.colour;
  } else {
    return primary;
  }
}
