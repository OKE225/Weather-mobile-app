import Octicons from "@expo/vector-icons/Octicons";
import { Tabs } from "expo-router";
import "./global.css";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "red",
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Octicons name="home-fill" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color, size }) => (
            <Octicons name="star-fill" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
