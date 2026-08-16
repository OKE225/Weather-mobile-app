import { OpenMeteoResponse } from "@/types/OpenMeteoResponse";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import WeatherIcon from "./WeatherIcon";

interface Props {
  name: string;
  currentCity: OpenMeteoResponse;
}

const WeatherInformations = ({ name, currentCity }: Props) => {
  let formattedDate = null;

  if (currentCity) {
    const date = new Date(currentCity.current.time);

    formattedDate = new Intl.DateTimeFormat("pl-PL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  }

  return (
    <ScrollView className="w-full">
      <WeatherIcon weatherCode={currentCity.current.weather_code} />

      <View className="bg-zinc-300">
        <Text className="text-3xl">{name}</Text>
        <Text className="text-xl">{formattedDate}</Text>
        <Text className="text-xl">
          Temperature: {currentCity.current.temperature_2m}{" "}
          {currentCity.current_units.temperature_2m}
        </Text>
        <Text className="text-xl">
          Feels like: {currentCity.current.apparent_temperature}{" "}
          {currentCity.current_units.apparent_temperature}
        </Text>
        <Text className="text-xl">
          Wind: {currentCity.current.wind_speed_10m}{" "}
          {currentCity.current_units.wind_speed_10m}, direction:{" "}
          {currentCity.current.wind_direction_10m}
          {currentCity.current_units.wind_direction_10m}
        </Text>
        <Text className="text-xl">
          Pressure: {currentCity.current.surface_pressure}{" "}
          {currentCity.current_units.surface_pressure}
        </Text>

        <Text className="text-2xl mt-6">7-day forecast</Text>
        {currentCity.daily.time.map((day: string, i: number) => (
          <Text className="text-lg" key={day}>
            {day}: {currentCity.daily.temperature_2m_min[i]} –{" "}
            {currentCity.daily.temperature_2m_max[i]}{" "}
            {currentCity.daily_units.temperature_2m_max}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
};

export default WeatherInformations;
