import { Tabs } from "expo-router";
import React, { useEffect } from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useUser } from "@/context/UserContext";
import { useBottomModal } from "@/context/BottomModalContext";
import UserSheet from "@/sheets/UserSheet";
import { useUserSetup } from "@/hooks/useStorage";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const { close, open } = useBottomModal();
  const { completeSetup } = useUserSetup();

  const { init, user } = useUser();
  const { hasSetup, loading } = useUserSetup();

  const onUserCompleted = () => {
    completeSetup();
    close();
  };

  // This is being called somehow - it shouldn't be.
  function onUserDismissed() {
    console.log("DISMISSED");
    completeSetup()
      .then(() => {
        console.log("SETUP");
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  }

  useEffect(() => {
    // User has been queried for but not found
    if (user === undefined && init && !loading && hasSetup) {
      open(<UserSheet onCompleted={onUserCompleted} />, "75%", onUserDismissed);
    }
  }, [user, init, hasSetup, loading]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          title: "Tasks",
          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={28}
              name="pencil.and.list.clipboard"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="shopping"
        options={{
          title: "Shopping",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="storefront" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="reminders"
        options={{
          title: "Reminders",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="brain.head.profile" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="notes"
        options={{
          title: "Notes",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="note.text" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
