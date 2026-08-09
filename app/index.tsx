import { OpenMeteoResponse } from "@/types/OpenMeteoResponse";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import fetchMeteoWeather from "./fetchMeteoWeather";

export const App = () => {
  const [weather, setWeather] = useState<OpenMeteoResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadWeather = async () => {
      try {
        const data = await fetchMeteoWeather();
        if (!cancelled) {
          setWeather(data);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Unknown error");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadWeather();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) return <Text className="text-xl">Loading weather...</Text>;
  if (error) return <Text className="text-xl">Error: {error}</Text>;
  if (!weather) return null;

  const { current, daily } = weather;

  return (
    <View
      className={`${current.is_day ? "bg-yellow-400" : "bg-blue-500"} p-5 flex-1`}>
      <Text className="text-2xl">Current weather (Warsaw area)</Text>
      <Text className="text-xl">Weather code: {current.weather_code}</Text>
      <Text className="text-xl">Temperature: {current.temperature_2m} °C</Text>
      <Text className="text-xl">
        Feels like: {current.apparent_temperature} °C
      </Text>
      <Text className="text-xl">
        Wind: {current.wind_speed_10m} m/s, direction:{" "}
        {current.wind_direction_10m}°
      </Text>
      <Text className="text-xl">Pressure: {current.surface_pressure} hPa</Text>

      <Text className="text-2xl mt-10">7-day forecast</Text>
      <View>
        {daily.time.map((day, i) => (
          <Text className="text-xl" key={day}>
            {day}: {daily.temperature_2m_min[i]} – {daily.temperature_2m_max[i]}{" "}
            °C
          </Text>
        ))}
      </View>
    </View>
  );
};

export default App;
