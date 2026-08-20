import { FavoritesProvider } from "@/FavoritesContext";
import Octicons from "@expo/vector-icons/Octicons";
import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";

import "./global.css";

export default function RootLayout() {
  return (
    <FavoritesProvider>
      <Tabs
        screenOptions={{
          headerShown: false,

          tabBarActiveTintColor: "#18181b",
          tabBarInactiveTintColor: "#71717a",
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

          tabBarActiveBackgroundColor: "rgba(255, 255, 255, 0.62)",
          tabBarInactiveBackgroundColor: "transparent",

          tabBarBackground: () => (
            <BlurView
              intensity={45}
              tint="light"
              style={StyleSheet.absoluteFill}
            />
          ),

          tabBarStyle: {
            position: "absolute",
            bottom: 55,
            marginHorizontal: "4%",
            width: "92%",
            height: 72,

            paddingHorizontal: 4,
            paddingTop: 1,

            backgroundColor: "rgba(255, 255, 255, 0.32)",
            borderWidth: 1,
            borderColor: "rgba(255, 255, 255, 0.7)",
            borderRadius: 26,
            overflow: "hidden",

            elevation: 0,

            shadowColor: "#27272a",
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.16,
            shadowRadius: 20,
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
    </FavoritesProvider>
  );
}
