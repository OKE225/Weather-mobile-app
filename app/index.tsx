import SearchInput from "@/components/SearchInput";
import WeatherInformations from "@/components/WeatherInformations";
import { OpenMeteoResponse } from "@/types/OpenMeteoResponse";
import fetchMeteoWeather from "@/utils/fetchMeteoWeather";
import getGeocoding from "@/utils/getGeocoding";
import setBackgroundColor from "@/utils/setBackgroundColor";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { BlurView } from "expo-blur";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  const [inputCity, setInputCity] = useState<string>("");
  const [cityWeatherInfo, setCityWeatherInfo] =
    useState<OpenMeteoResponse | null>(null);
  const [cityName, setCityName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const bgColorHex = "#d4d4d8";

  const bgColor = useSharedValue(bgColorHex);

  const animatedBackgroundStyle = useAnimatedStyle(() => ({
    backgroundColor: bgColor.value,
  }));

  useEffect(() => {
    const code = cityWeatherInfo?.current.weather_code;

    if (code == null) {
      bgColor.value = withTiming(bgColorHex, { duration: 500 });
      return;
    }

    bgColor.value = withTiming(setBackgroundColor(code), {
      duration: 500,
    });
  }, [cityWeatherInfo?.current.weather_code]);

  const handleInputChange = (text: string) => {
    setInputCity(text);

    if (!text.trim()) {
      setCityName("");
      setCityWeatherInfo(null);
      setLoading(false);
    }
  };

  const handleEndEditing = async (city: string) => {
    const trimmedCity = city.trim();

    if (!trimmedCity) {
      setCityName("");
      setCityWeatherInfo(null);
      setLoading(false);
      setInputCity("");
      return;
    }

    setLoading(true);
    setCityWeatherInfo(null);

    try {
      const geoData = await getGeocoding(trimmedCity);

      if (!geoData?.results?.[0]) {
        console.warn("Brak wyników geokodowania");
        setCityName("");
        setCityWeatherInfo(null);
        return;
      }

      const { latitude, longitude, name } = geoData.results[0];
      const weatherData = await fetchMeteoWeather(latitude, longitude);

      setCityName(name);
      setCityWeatherInfo(weatherData);
    } catch (error) {
      console.error("Błąd pobierania pogody:", error);
      setCityName("");
      setCityWeatherInfo(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Animated.View
      className="flex-1"
      style={[{ flex: 1 }, animatedBackgroundStyle]}>
      <SafeAreaView className="flex-1 px-5 mt-2">
        <View>
          <SearchInput
            value={inputCity}
            onChangeText={handleInputChange}
            handleEndEditing={handleEndEditing}
          />
        </View>

        <View className="flex-1 pt-4">
          {!cityWeatherInfo && !loading && (
            <View className="flex-1 items-center justify-center pb-24">
              <BlurView
                intensity={30}
                tint="light"
                className="overflow-hidden rounded-[32px] border border-white/60 mt-8">
                <View className="items-center bg-white/30 px-9 py-10">
                  <View className="h-20 w-20 items-center justify-center rounded-full border border-white/70 bg-white/40">
                    <MaterialCommunityIcons
                      name="city-variant-outline"
                      size={42}
                      color="#3f3f46"
                    />
                  </View>

                  <Text className="mt-5 text-center text-2xl font-bold text-zinc-900">
                    Sprawdź pogodę
                  </Text>

                  <Text className="mt-2 text-center text-base leading-6 text-zinc-700">
                    Wpisz nazwę miasta, aby zobaczyć aktualną pogodę oraz
                    prognozę na najbliższe dni.
                  </Text>
                </View>
              </BlurView>
            </View>
          )}

          {loading && (
            <View className="flex-1 items-center justify-center pb-24">
              <BlurView
                intensity={30}
                tint="light"
                className="overflow-hidden rounded-[32px] border border-white/60 w-full">
                <View className="items-center bg-white/30 py-9">
                  <View className="h-20 w-20 items-center justify-center rounded-full border border-white/70 bg-white/40">
                    <ActivityIndicator size="large" color="#3f3f46" />
                  </View>

                  <Text className="mt-5 text-xl font-bold text-zinc-900">
                    Wyszukiwanie miasta...
                  </Text>

                  <Text className="mt-2 text-center text-base text-zinc-700">
                    Pobieramy najnowsze dane pogodowe.
                  </Text>
                </View>
              </BlurView>
            </View>
          )}

          {cityWeatherInfo && !loading && (
            <WeatherInformations
              name={cityName}
              currentCity={cityWeatherInfo}
            />
          )}
        </View>
      </SafeAreaView>
    </Animated.View>
  );
};

export default Index;
