const setBackgroundColor = (weather_code: number): string => {
  let bgColor: string = "#e4e4e7";

  switch (weather_code) {
    case 0:
      bgColor = "#a8d8f0";
      return bgColor;
    case 1:
      bgColor = "#b8e0f4";
      return bgColor;
    case 2:
      bgColor = "#d0e8f8";
      return bgColor;
    case 3:
      bgColor = "#dce8f0";
      return bgColor;
    case 45:
      bgColor = "#e8e8e8";
      return bgColor;
    case 48:
      bgColor = "#e8e8e8";
      return bgColor;
    case 51:
      bgColor = "#01aaff";
      return bgColor;
    case 53:
      bgColor = "#018cd4";
      return bgColor;
    case 55:
      bgColor = "#0172ad";
      return bgColor;
    case 80:
      bgColor = "#029ae8";
      return bgColor;
    case 81:
      bgColor = "#017fc0";
      return bgColor;
    case 82:
      bgColor = "#02659a";
      return bgColor;
    case 61:
      bgColor = "#3c71f7";
      return bgColor;
    case 63:
      bgColor = "#1d59d0";
      return bgColor;
    case 65:
      bgColor = "#1343a0";
      return bgColor;
    case 56:
      bgColor = "#8577dd";
      return bgColor;
    case 57:
      bgColor = "#655cd6";
      return bgColor;
    case 66:
      bgColor = "#7569da";
      return bgColor;
    case 67:
      bgColor = "#4040bf";
      return bgColor;
    case 77:
      bgColor = "#a780d4";
      return bgColor;
    case 85:
      bgColor = "#9b71cf";
      return bgColor;
    case 86:
      bgColor = "#7540bf";
      return bgColor;
    case 71:
      bgColor = "#9062ca";
      return bgColor;
    case 73:
      bgColor = "#8352c5";
      return bgColor;
    case 75:
      bgColor = "#6935b3";
      return bgColor;
    case 95:
      bgColor = "#525f7a";
      return bgColor;
    case 96:
      bgColor = "#3d475c";
      return bgColor;
    case 99:
      bgColor = "#2a3140";
      return bgColor;
    default:
      return bgColor;
  }
};

export default setBackgroundColor;
