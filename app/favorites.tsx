import Octicons from "@expo/vector-icons/Octicons";
import { BlurView } from "expo-blur";
import React from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useFavorites } from "@/FavoritesContext";
import RenderFavoriteItem from "@/components/RenderFavoriteItem";

const Favorites = () => {
  const { favorites } = useFavorites();

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
          renderItem={({ item }) => <RenderFavoriteItem item={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 200, marginTop: 25 }}
        />
      )}
    </SafeAreaView>
  );
};

export default Favorites;
