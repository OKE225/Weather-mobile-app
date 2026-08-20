import { OpenMeteoResponse } from "@/types/OpenMeteoResponse";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export interface FavoriteLocation {
  id: string;
  name: string;
  weather: OpenMeteoResponse;
}

interface FavoritesContextType {
  favorites: FavoriteLocation[];
  isLoading: boolean;
  addFavorite: (name: string, weather: OpenMeteoResponse, id?: string) => void;
  removeFavorite: (id: string) => void;
  toggleFavorite: (
    name: string,
    weather: OpenMeteoResponse,
    id?: string,
  ) => void;
  isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

interface FavoritesProviderProps {
  children: ReactNode;
}

const FAVORITES_STORAGE_KEY = "weather_app_favorites";

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState<FavoriteLocation[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem(
          FAVORITES_STORAGE_KEY,
        );

        if (storedFavorites) {
          const parsedFavorites: FavoriteLocation[] =
            JSON.parse(storedFavorites);

          setFavorites(parsedFavorites);
        }
      } catch (error) {
        console.error("Nie udało się wczytać ulubionych lokalizacji:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFavorites();
  }, []);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    const saveFavorites = async () => {
      try {
        await AsyncStorage.setItem(
          FAVORITES_STORAGE_KEY,
          JSON.stringify(favorites),
        );
      } catch (error) {
        console.error("Nie udało się zapisać ulubionych lokalizacji:", error);
      }
    };

    saveFavorites();
  }, [favorites, isLoading]);

  const addFavorite = (name: string, weather: OpenMeteoResponse, id = name) => {
    setFavorites((previousFavorites) => {
      const alreadyExists = previousFavorites.some(
        (favorite) => favorite.id === id,
      );

      if (alreadyExists) {
        return previousFavorites;
      }

      return [
        ...previousFavorites,
        {
          id,
          name,
          weather,
        },
      ];
    });
  };

  const removeFavorite = (id: string) => {
    setFavorites((previousFavorites) =>
      previousFavorites.filter((favorite) => favorite.id !== id),
    );
  };

  const isFavorite = (id: string) => {
    return favorites.some((favorite) => favorite.id === id);
  };

  const toggleFavorite = (
    name: string,
    weather: OpenMeteoResponse,
    id = name,
  ) => {
    setFavorites((previousFavorites) => {
      const alreadyExists = previousFavorites.some(
        (favorite) => favorite.id === id,
      );

      if (alreadyExists) {
        return previousFavorites.filter((favorite) => favorite.id !== id);
      }

      return [
        ...previousFavorites,
        {
          id,
          name,
          weather,
        },
      ];
    });
  };

  const value = useMemo(
    () => ({
      favorites,
      isLoading,
      addFavorite,
      removeFavorite,
      toggleFavorite,
      isFavorite,
    }),
    [favorites, isLoading],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites musi być użyty wewnątrz FavoritesProvider");
  }

  return context;
}
