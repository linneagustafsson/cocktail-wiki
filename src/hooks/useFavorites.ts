import type { Cocktail } from "../types/cocktail";

export const useFavorites = () => {
  const getFavorites = (): Cocktail[] => {
    return JSON.parse(localStorage.getItem("favorites") || "[]");
  };

  const addFavorite = (cocktail: Cocktail): boolean => {
    const existing = getFavorites();
    const alreadyExists = existing.some((fav) => fav.id === cocktail.id);
    if (alreadyExists) return false;

    localStorage.setItem("favorites", JSON.stringify([...existing, cocktail]));
    return true;
  };

  const removeFavorite = (id: string): void => {
    const updated = getFavorites().filter((c) => c.id !== id);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return { getFavorites, addFavorite, removeFavorite };
};
