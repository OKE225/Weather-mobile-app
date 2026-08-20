import { useFavorites } from "@/FavoritesContext";
import { OpenMeteoResponse } from "@/types/OpenMeteoResponse";
import Octicons from "@expo/vector-icons/Octicons";
import { BlurView } from "expo-blur";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

import WeatherIcon from "./WeatherIcon";

interface Props {
  name: string;
  currentCity: OpenMeteoResponse;
  cityId?: string;
}

const WeatherInformations = ({ name, currentCity, cityId }: Props) => {
  const { toggleFavorite, isFavorite } = useFavorites();

  const favoriteId = cityId ?? name;
  const addedToFavorite = isFavorite(favoriteId);

  const formattedDate = new Intl.DateTimeFormat("pl-PL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(currentCity.current.time));

  return (
    <ScrollView
      className="w-full"
      contentContainerClassName="pb-[150px] pt-4"
      showsVerticalScrollIndicator={false}>
      <View className="items-center mb-6">
        <WeatherIcon weatherCode={currentCity.current.weather_code} />
      </View>

      <BlurView
        intensity={35}
        tint="light"
        className="overflow-hidden rounded-[32px] border border-white/70">
        <View className="bg-white/30 p-5">
          <View className="mb-5 flex-row items-start justify-between">
            <View className="flex-1 pr-3">
              <Text className="text-3xl font-bold text-zinc-900">{name}</Text>
              <Text className="mt-1 text-base text-zinc-600">
                {formattedDate}
              </Text>
            </View>

            <Pressable
              className="h-12 w-12 items-center justify-center rounded-full border border-white/70 bg-white/40"
              onPress={() => toggleFavorite(name, currentCity, favoriteId)}>
              <Octicons
                name={addedToFavorite ? "star-fill" : "star"}
                size={25}
                color={addedToFavorite ? "#eab308" : "#52525b"}
              />
            </Pressable>
          </View>

          <View className="mb-5 rounded-3xl border border-white/60 bg-white/35 p-4">
            <Text className="text-sm font-medium uppercase tracking-wider text-zinc-500">
              Current temperature
            </Text>

            <Text className="mt-1 text-5xl font-bold text-zinc-900">
              {currentCity.current.temperature_2m}
              <Text className="text-2xl text-zinc-600">
                {" "}
                {currentCity.current_units.temperature_2m}
              </Text>
            </Text>

            <Text className="mt-2 text-lg text-zinc-700">
              Feels like: {currentCity.current.apparent_temperature}{" "}
              {currentCity.current_units.apparent_temperature}
            </Text>
          </View>

          <View className="mb-6 flex-row flex-wrap justify-between gap-3">
            <View className="min-w-[47%] flex-1 rounded-2xl border border-white/60 bg-white/35 p-4">
              <Text className="text-sm text-zinc-500">Wind</Text>
              <Text className="mt-1 text-lg font-semibold text-zinc-800">
                {currentCity.current.wind_speed_10m}{" "}
                {currentCity.current_units.wind_speed_10m}
              </Text>
              <Text className="text-sm text-zinc-600">
                Direction: {currentCity.current.wind_direction_10m}
                {currentCity.current_units.wind_direction_10m}
              </Text>
            </View>

            <View className="min-w-[47%] flex-1 rounded-2xl border border-white/60 bg-white/35 p-4">
              <Text className="text-sm text-zinc-500">Pressure</Text>
              <Text className="mt-1 text-lg font-semibold text-zinc-800">
                {currentCity.current.surface_pressure}{" "}
                {currentCity.current_units.surface_pressure}
              </Text>
            </View>
          </View>

          <Text className="mb-3 text-2xl font-bold text-zinc-900">
            7-day forecast
          </Text>

          <View className="gap-3">
            {currentCity.daily.time.map((day: string, i: number) => (
              <View
                key={day}
                className="flex-row items-center justify-between rounded-2xl border border-white/60 bg-white/35 px-4 py-3">
                <Text className="text-base font-medium text-zinc-800">
                  {day}
                </Text>

                <Text className="text-base font-semibold text-zinc-700">
                  {currentCity.daily.temperature_2m_min[i]}
                  {currentCity.daily_units.temperature_2m_min} –{" "}
                  {currentCity.daily.temperature_2m_max[i]}
                  {currentCity.daily_units.temperature_2m_max}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </BlurView>
    </ScrollView>
  );
};

export default WeatherInformations;
