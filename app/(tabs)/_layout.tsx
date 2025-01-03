import { Tabs } from "expo-router";
import React, { useEffect } from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useSQLiteContext } from "expo-sqlite";
import { User } from "@/database/type";
import { useUser } from "@/database/hooks";
import { useBottomModal } from "@/context/BottomModalContext";
import UserSheet from "@/sheets/UserSheet";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const { setContent, show, hide } = useBottomModal();

  const { user } = useUser();

  const onUserCompleted = () => {
    hide();
  };

  useEffect(() => {
    // User has been queried for but not found
    if (user === null) {
      setContent(<UserSheet onCompleted={onUserCompleted} />);
      show("75%");
    }
  }, [user]);

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
