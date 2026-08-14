const getGeocoding = async (city: string) => {
  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        city,
      )}&count=1&language=en&format=json`,
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Błąd podczas wyszukiwania miasta:", error);
    return null;
  }
};

export default getGeocoding;
