export interface OpenMeteoResponse {
  latitude: number;
  longitude: number;
  timezone: string;
  current_units: {
    temperature_2m: string;
    apparent_temperature: string;
    wind_speed_10m: string;
    wind_direction_10m: string;
    surface_pressure: string;
  };
  current: {
    temperature_2m: number;
    apparent_temperature: number;
    weather_code: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
    surface_pressure: number;
    time: string;
    is_day: number;
  };
  daily_units: {
    temperature_2m_max: string;
    temperature_2m_min: string;
  };
  daily: {
    time: string[];
    temperature_2m_min: number[];
    temperature_2m_max: number[];
  };
}
