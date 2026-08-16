import React from "react";
import { Image, View } from "react-native";

import Clear from "../assets/icons/clear.png";
import HeavyDrizzle from "../assets/icons/dense-drizzle.png";
import IcyDrizzle from "../assets/icons/dense-freezing-drizzle.png";
import Fog from "../assets/icons/fog.png";
import IcyRain from "../assets/icons/heavy-freezing-rain.png";
import HeavyRain from "../assets/icons/heavy-rain.png";
import HeavySnow from "../assets/icons/heavy-snowfall.png";
import LightDrizzle from "../assets/icons/light-drizzle.png";
import LightIcyDrizzle from "../assets/icons/light-freezing-drizzle.png";
import LightIcyRain from "../assets/icons/light-freezing-rain.png";
import LightRain from "../assets/icons/light-rain.png";
import Drizzle from "../assets/icons/moderate-drizzle.png";
import Rain from "../assets/icons/moderate-rain.png";
import Snow from "../assets/icons/moderate-snowfall.png";
import MostlyClear from "../assets/icons/mostly-clear.png";
import Overcast from "../assets/icons/overcast.png";
import PartlyCloudy from "../assets/icons/partly-cloudy.png";
import IcyFog from "../assets/icons/rime-fog.png";
import LightSnow from "../assets/icons/slight-snowfall.png";
import SnowGrains from "../assets/icons/snowflake.png";
import ThunderStormHail from "../assets/icons/thunderstorm-with-hail.png";
import ThunderStorm from "../assets/icons/thunderstorm.png";

interface Props {
  weatherCode: number;
}

const WeatherIcon = ({ weatherCode }: Props) => {
  let iconFromCode = null;

  switch (weatherCode) {
    case 0:
      iconFromCode = Clear;
      break;
    case 1:
      iconFromCode = MostlyClear;
      break;
    case 2:
      iconFromCode = PartlyCloudy;
      break;
    case 3:
      iconFromCode = Overcast;
      break;
    case 45:
      iconFromCode = Fog;
      break;
    case 48:
      iconFromCode = IcyFog;
      break;
    case 51:
      iconFromCode = LightDrizzle;
      break;
    case 53:
      iconFromCode = Drizzle;
      break;
    case 55:
      iconFromCode = HeavyDrizzle;
      break;
    case 80:
    case 61:
      iconFromCode = LightRain;
      break;
    case 81:
    case 63:
      iconFromCode = Rain;
      break;
    case 82:
    case 65:
      iconFromCode = HeavyRain;
      break;
    case 56:
      iconFromCode = LightIcyDrizzle;
      break;
    case 57:
      iconFromCode = IcyDrizzle;
      break;
    case 66:
      iconFromCode = LightIcyRain;
      break;
    case 67:
      iconFromCode = IcyRain;
      break;
    case 77:
      iconFromCode = SnowGrains;
      break;
    case 85:
    case 71:
      iconFromCode = LightSnow;
      break;
    case 73:
      iconFromCode = Snow;
      break;
    case 86:
    case 75:
      iconFromCode = HeavySnow;
      break;
    case 95:
      iconFromCode = ThunderStorm;
      break;
    case 96:
    case 99:
      iconFromCode = ThunderStormHail;
      break;
  }

  return (
    <View>
      <Image
        source={iconFromCode}
        className="w-[128px] h-[128px] mx-auto drop-shadow-2xl shadow shadow-color-black/30 shadow-offset-y-4 shadow-radius-8 elevation-8"
        resizeMode="contain"
      />
    </View>
  );
};

export default WeatherIcon;
