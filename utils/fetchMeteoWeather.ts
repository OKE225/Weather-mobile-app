import { OpenMeteoResponse } from "@/types/OpenMeteoResponse";

const fetchMeteoWeather = async (
  latitude: number,
  longitude: number,
): Promise<OpenMeteoResponse> => {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${encodeURIComponent(latitude)}&longitude=${encodeURIComponent(longitude)}&current=temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure,is_day&hourly=precipitation_probability&daily=weather_code,temperature_2m_mean,temperature_2m_max,temperature_2m_min,apparent_temperature_mean,apparent_temperature_max,apparent_temperature_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,wind_direction_10m_dominant,surface_pressure_mean,sunrise,sunset&forecast_days=7`,
  );

  if (!response.ok) {
    throw new Error(
      `Weather API error: ${response.status} ${response.statusText}`,
    );
  }

  const data: OpenMeteoResponse = await response.json();
  return data;
};

export default fetchMeteoWeather;
