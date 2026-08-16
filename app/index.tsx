import SearchInput from "@/components/SearchInput";
import WeatherInformations from "@/components/WeatherInformations";
import { OpenMeteoResponse } from "@/types/OpenMeteoResponse";
import fetchMeteoWeather from "@/utils/fetchMeteoWeather";
import getGeocoding from "@/utils/getGeocoding";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const index = () => {
  const [inputCity, setInputCity] = useState<string>("");
  const [cityWeatherInfo, setCityWeatherInfo] =
    useState<null | OpenMeteoResponse>(null);
  const [cityName, setCityName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleEndEditing = async (city: string) => {
    setLoading(true);
    const trimmedCity = city.trim();

    if (!trimmedCity) {
      setCityName("");
      setCityWeatherInfo(null);
      setLoading(false);
      return;
    }

    const geoData = await getGeocoding(trimmedCity);
    if (!geoData?.results?.[0]) {
      console.warn("Brak wyników geokodowania");
      setCityName("");
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
      colors={["#fafafa", "#e4e4e7"]}
      // colors={["#ec4899", "#db2777"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}>
      <SafeAreaView className="flex-1">
        <SearchInput
          value={inputCity}
          onChangeText={setInputCity}
          handleEndEditing={handleEndEditing}
        />

        <View className="flex-1 items-center justify-center">
          {!cityWeatherInfo ? (
            loading ? (
              <Text className="text-xl">Searching...</Text>
            ) : (
              <Text className="text-xl">Enter a city to see weather</Text>
            )
          ) : (
            <WeatherInformations
              name={cityName}
              currentCity={cityWeatherInfo}
            />
          )}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default index;
