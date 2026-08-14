import { OpenMeteoResponse } from "@/types/OpenMeteoResponse";
import fetchMeteoWeather from "@/utils/fetchMeteoWeather";
import getGeocoding from "@/utils/getGeocoding";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ClearDayIcon from "../assets/weather-icons/scattered-thunderstorms-day.svg";

const index = () => {
  const [inputCity, setInputCity] = useState<string>("");
  const [cityWeatherInfo, setCityWeatherInfo] =
    useState<null | OpenMeteoResponse>(null);
  const [cityName, setCityName] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleEndEditing = async (city: string) => {
    setLoading(true);
    const trimmedCity = city.trim();

    if (!trimmedCity) {
      setCityName(null);
      setCityWeatherInfo(null);
      setLoading(false);
      return;
    }

    const geoData = await getGeocoding(trimmedCity);
    if (!geoData?.results?.[0]) {
      console.warn("Brak wyników geokodowania");
      setCityName(null);
      setCityWeatherInfo(null);
      setLoading(false);
      return;
    }

    const { latitude, longitude, name } = geoData.results[0];
    setCityName(name);

    try {
      const weatherData = await fetchMeteoWeather(latitude, longitude);
      setCityWeatherInfo(weatherData);
    } catch (e) {
      console.error("Błąd pobierania pogody:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      className="flex-1 px-5"
      colors={["#fefce8", "#fef08a"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}>
      <SafeAreaView>
        <ScrollView>
          <TextInput
            className="border rounded-full px-5 text-xl"
            value={inputCity}
            onChangeText={setInputCity}
            onEndEditing={(event) => {
              handleEndEditing(event.nativeEvent.text);
            }}
          />

          <View className="w-[256px] h-[219px] bg-blue-300 items-center justify-center mx-auto">
            <ClearDayIcon width={256} height={219} viewBox="0 0 56 48" />
          </View>

          {!cityWeatherInfo ? (
            loading ? (
              <Text className="text-xl">Searching...</Text>
            ) : (
              <Text className="text-xl">Enter a city to see weather</Text>
            )
          ) : (
            <View>
              <Text className="text-3xl">{cityName}</Text>
              <Text className="text-xl">
                Temperature: {cityWeatherInfo.current.temperature_2m}{" "}
                {cityWeatherInfo.current_units.temperature_2m}
              </Text>
              <Text className="text-xl">
                Feels like: {cityWeatherInfo.current.apparent_temperature}{" "}
                {cityWeatherInfo.current_units.apparent_temperature}
              </Text>
              <Text className="text-xl">
                Wind: {cityWeatherInfo.current.wind_speed_10m}{" "}
                {cityWeatherInfo.current_units.wind_speed_10m}, direction:{" "}
                {cityWeatherInfo.current.wind_direction_10m}
                {cityWeatherInfo.current_units.wind_direction_10m}
              </Text>
              <Text className="text-xl">
                Pressure: {cityWeatherInfo.current.surface_pressure}{" "}
                {cityWeatherInfo.current_units.surface_pressure}
              </Text>

              <Text className="text-2xl mt-6">7-day forecast</Text>
              {cityWeatherInfo.daily.time.map((day: string, i: number) => (
                <Text className="text-lg" key={day}>
                  {day}: {cityWeatherInfo.daily.temperature_2m_min[i]} –{" "}
                  {cityWeatherInfo.daily.temperature_2m_max[i]}{" "}
                  {cityWeatherInfo.daily_units.temperature_2m_max}
                </Text>
              ))}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default index;
