import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import fetchWeather from "./fetchPlaceWeather";

export const App = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadWeather = async () => {
      try {
        const data = await fetchWeather();
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

  if (loading) return <Text>Loading weather...</Text>;
  if (error) return <Text>Error: {error}</Text>;
  if (!weather) return null;

  const { current, daily } = weather;

  return (
    <View>
      <Text>Current weather (Warsaw area)</Text>
      <Text>Temperature: {current.temperature_2m} °C</Text>
      <Text>Feels like: {current.apparent_temperature} °C</Text>
      <Text>Wind: {current.wind_speed_10m} m/s</Text>

      <Text>7-day forecast</Text>
      <View>
        {daily.time.map((day, i) => (
          <Text key={day}>
            {day}: {daily.temperature_2m_min[i]} – {daily.temperature_2m_max[i]}{" "}
            °C
          </Text>
        ))}
      </View>
    </View>
  );
};

export default App;
