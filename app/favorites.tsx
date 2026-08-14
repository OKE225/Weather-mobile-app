import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const favorites = () => {
  return (
    <LinearGradient
      className="flex-1 px-5"
      colors={["#ffffff", "#000000"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}>
      <SafeAreaView>
        <Text>favorites</Text>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default favorites;
