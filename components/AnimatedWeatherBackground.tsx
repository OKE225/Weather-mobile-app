import setBackgroundColor from "@/utils/setBackgroundColor";
import React, { useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface Props {
  children: React.ReactNode;
  weather_code: number | undefined;
}

const AnimatedWeatherBackground = ({ children, weather_code }: Props) => {
  const bgColorHex = "#d4d4d8";

  const bgColor = useSharedValue(bgColorHex);

  const animatedBackgroundStyle = useAnimatedStyle(() => ({
    backgroundColor: bgColor.value,
  }));

  useEffect(() => {
    const code = weather_code;

    if (code == null) {
      bgColor.value = withTiming(bgColorHex, { duration: 500 });
      return;
    }

    bgColor.value = withTiming(setBackgroundColor(code), {
      duration: 500,
    });
  }, [weather_code, bgColor]);

  return (
    <Animated.View className="flex-1" style={animatedBackgroundStyle}>
      {children}
    </Animated.View>
  );
};

export default AnimatedWeatherBackground;
