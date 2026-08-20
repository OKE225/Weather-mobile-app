import Feather from "@expo/vector-icons/Feather";
import { BlurView } from "expo-blur";
import React from "react";
import { Pressable, TextInput, View } from "react-native";

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  handleEndEditing: (city: string) => Promise<void>;
}

const SearchInput = ({ value, onChangeText, handleEndEditing }: Props) => {
  const handleSearch = () => {
    const city = value.trim();

    if (city) {
      handleEndEditing(city);
    }
  };

  return (
    <BlurView
      intensity={35}
      tint="light"
      className="overflow-hidden rounded-full border border-white/70">
      <View className="flex-row items-center bg-white/35 px-4 py-1">
        <Feather name="search" size={22} color="#52525b" />

        <TextInput
          className="flex-1 px-3 py-3 text-lg text-zinc-900"
          value={value}
          placeholder="Search city..."
          placeholderTextColor="#71717a"
          onChangeText={onChangeText}
          onEndEditing={handleSearch}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
          autoCapitalize="words"
          autoCorrect={false}
        />

        {value.length > 0 && (
          <Pressable
            className="h-8 w-8 items-center justify-center rounded-full bg-white/50"
            onPress={() => onChangeText("")}
            hitSlop={8}>
            <Feather name="x" size={18} color="#52525b" />
          </Pressable>
        )}
      </View>
    </BlurView>
  );
};

export default SearchInput;
