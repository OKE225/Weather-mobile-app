import Octicons from "@expo/vector-icons/Octicons";
import { BlurView } from "expo-blur";
import React from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { FavoriteLocation, useFavorites } from "@/FavoritesContext";

const Favorites = () => {
  const { favorites, removeFavorite } = useFavorites();

  const renderFavorite = ({ item }: { item: FavoriteLocation }) => {
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
                {currentWeather.apparent_temperature}{" "}
                {units.apparent_temperature}
              </Text>
            </View>
          </View>
        </View>
      </BlurView>
    );
  };

  return (
    <SafeAreaView className="flex-1 px-5 bg-[#d4d4d8]">
      <BlurView
        intensity={25}
        tint="light"
        className="mb-5 mt-2 overflow-hidden rounded-3xl border border-white/60">
        <View className="bg-white/25 px-5 py-4">
          <Text className="text-3xl font-bold text-zinc-900">Favorites</Text>

          <Text className="mt-1 text-base text-zinc-700">
            {favorites.length === 0
              ? "You don't have any saved cities yet"
              : `Saved locations: ${favorites.length}`}
          </Text>
        </View>
      </BlurView>

      {favorites.length === 0 ? (
        <View className="flex-1 items-center justify-center pb-24">
          <BlurView
            intensity={30}
            tint="light"
            className="overflow-hidden rounded-[32px] border border-white/60">
            <View className="items-center bg-white/30 px-10 py-9">
              <View className="h-20 w-20 items-center justify-center rounded-full border border-white/70 bg-white/40">
                <Octicons name="star" size={38} color="#52525b" />
              </View>

              <Text className="mt-5 text-center text-2xl font-bold text-zinc-900">
                No favorites yet
              </Text>

              <Text className="mt-2 text-center text-base leading-6 text-zinc-700">
                Search for a city and tap the star icon to add it to your
                favorites
              </Text>
            </View>
          </BlurView>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={renderFavorite}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 200, marginTop: 25 }}
        />
      )}
    </SafeAreaView>
  );
};

export default Favorites;
