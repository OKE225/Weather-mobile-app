import Octicons from "@expo/vector-icons/Octicons";
import { Tabs } from "expo-router";

import "./global.css";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: "#fafafa", // zinc-50
        tabBarInactiveTintColor: "#71717a99", // zinc-500 60% opacity
        tabBarShowLabel: true,
        tabBarLabelPosition: "below-icon",

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginTop: 1,
        },

        tabBarIconStyle: {
          marginTop: 3,
        },

        tabBarItemStyle: {
          height: 58,
          marginHorizontal: 5,
          marginVertical: 6,
          borderRadius: 20,
          overflow: "hidden",
        },

        tabBarActiveBackgroundColor: "#09090b40", // zinc-950 25% opacity
        tabBarInactiveBackgroundColor: "transparent",

        tabBarStyle: {
          position: "absolute",
          bottom: 54,
          height: 72,
          width: "90%",
          marginHorizontal: "5%",
          paddingHorizontal: 4,
          backgroundColor: "#09090b33", // zinc-950 20% opacity
          borderWidth: 1,
          borderColor: "rgba(255, 255, 255, 0.15)",
          borderRadius: 26,
          elevation: 0,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 8,
          },
          shadowOpacity: 0.28,
          shadowRadius: 18,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <Octicons
              name={focused ? "home-fill" : "home"}
              size={focused ? size + 1 : size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color, size, focused }) => (
            <Octicons
              name={focused ? "star-fill" : "star"}
              size={focused ? size + 1 : size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
