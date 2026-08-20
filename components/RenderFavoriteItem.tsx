import { FavoriteLocation, useFavorites } from "@/FavoritesContext";
import Octicons from "@expo/vector-icons/Octicons";
import { BlurView } from "expo-blur";
import React from "react";
import { Pressable, Text, View } from "react-native";

const RenderFavoriteItem = ({ item }: { item: FavoriteLocation }) => {
  const { removeFavorite } = useFavorites();

  const currentWeather = item.weather.current;
  const units = item.weather.current_units;

  return (
    <BlurView
      intensity={30}
      tint="light"
      className="mb-4 overflow-hidden rounded-[28px] border border-white/60">
      <View className="bg-white/30 p-5">
        <View className="flex-row items-center justify-between">
          <View className="flex-1 pr-4">
            <Text className="text-3xl font-bold text-zinc-900">
              {item.name}
            </Text>
          </View>

          <Pressable
            className="h-9 w-9 items-center justify-center rounded-full border border-white/70 bg-white/40"
            onPress={() => removeFavorite(item.id)}
            hitSlop={10}>
            <Octicons name="star-fill" size={20} color="#eab308" />
          </Pressable>
        </View>

        <View className="flex-row gap-3 mt-5">
          <View className="flex-1 rounded-2xl border border-white/60 bg-white/35 p-4">
            <Text className="text-sm text-zinc-500">Temperature</Text>

            <Text className="mt-1 text-xl font-bold text-zinc-900">
              {currentWeather.temperature_2m} {units.temperature_2m}
            </Text>
          </View>

          <View className="flex-1 rounded-2xl border border-white/60 bg-white/35 p-4">
            <Text className="text-sm text-zinc-500">Feels like</Text>

            <Text className="mt-1 text-xl font-bold text-zinc-900">
              {currentWeather.apparent_temperature} {units.apparent_temperature}
            </Text>
          </View>
        </View>
      </View>
    </BlurView>
  );
};

export default RenderFavoriteItem;
