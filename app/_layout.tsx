import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";

import "../global.css";
import { BottomSheetInit } from "@/components/BottomSheetInit";
import DatabaseProvider from "@/database/DatabaseProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { UserProvider } from "@/context/UserContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <DatabaseProvider>
        <UserProvider>
          <GestureHandlerRootView>
            <BottomSheetInit>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen
                  name={"(sheets)/profile"}
                  options={{
                    presentation: "formSheet",
                    gestureDirection: "vertical",
                    animation: "slide_from_bottom",
                    sheetGrabberVisible: true,
                    sheetInitialDetentIndex: 0,
                    sheetAllowedDetents: [0.8],
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name={"(sheets)/createTask"}
                  options={{
                    presentation: "formSheet",
                    gestureDirection: "vertical",
                    animation: "slide_from_bottom",
                    sheetGrabberVisible: true,
                    sheetInitialDetentIndex: 0,
                    sheetAllowedDetents: [0.8],
                    headerShown: false,
                  }}
                />
                <Stack.Screen name="+not-found" />
              </Stack>
              <StatusBar style="auto" />
            </BottomSheetInit>
          </GestureHandlerRootView>
        </UserProvider>
      </DatabaseProvider>
    </ThemeProvider>
  );
}
