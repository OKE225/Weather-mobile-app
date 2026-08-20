import { OpenMeteoResponse } from "@/types/OpenMeteoResponse";
import React from "react";
import { Text, View } from "react-native";

interface Props {
  currentWeather: OpenMeteoResponse;
}

const SevenDayForecast = ({ currentWeather }: Props) => {
  return (
    <>
      <Text className="mb-3 text-2xl font-bold text-zinc-900">
        7-day forecast
      </Text>

      <View className="gap-3">
        {currentWeather.daily.time.map((day: string, i: number) => (
          <View
            key={day}
            className="flex-row items-center justify-between rounded-2xl border border-white/60 bg-white/35 px-4 py-3">
            <Text className="text-base font-medium text-zinc-800">{day}</Text>

            <Text className="text-base font-semibold text-zinc-700">
              {currentWeather.daily.temperature_2m_min[i]}
              {currentWeather.daily_units.temperature_2m_min} –{" "}
              {currentWeather.daily.temperature_2m_max[i]}
              {currentWeather.daily_units.temperature_2m_max}
            </Text>
          </View>
        ))}
      </View>
    </>
  );
};

export default SevenDayForecast;
