import { useState, useEffect } from "react";
import CocktailCard from "../components/CocktailCard";
import { useFavorites } from "../hooks/useFavorites";
import type { Cocktail } from "../types/cocktail";
import "../styles/components/Favorites.css";

const FavoritesPage = (): React.ReactElement => {
  const { getFavorites, removeFavorite } = useFavorites();
  const [favorites, setFavorites] = useState<Cocktail[]>([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const handleRemove = (id: string) => {
    removeFavorite(id);
    setFavorites(getFavorites());
  };
  return (
    <div className="favorites-page">
      <h2 className="favorites-page__heading">Dina favoriter</h2>{" "}
      {favorites.length === 0 ? (
        <p className="favorites-page__empty">
          Du har inga sparade cocktails ännu.
        </p>
      ) : (
        <div className="favorites-page__results">
          {favorites.map((cocktail) => (
            <div key={cocktail.id} className="favorites-page__card">
              <div className="favorites-page__card-content">
                <CocktailCard
                  id={cocktail.id}
                  name={cocktail.name}
                  image={cocktail.image}
                />
                <button
                  className="favorites-page__remove-button"
                  onClick={() => handleRemove(cocktail.id)}
                >
                  ❌ Ta bort
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
