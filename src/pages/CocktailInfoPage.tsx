import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IngredientList from "../components/IngredientList";
import { mapRawCocktailData } from "../utils/mapRawCocktailData";
import type { Cocktail } from "../types/cocktail";
import "../styles/components/CocktailInfoPage.css";

const CocktailInfoPage = (): React.ReactElement => {
  const { id } = useParams();
  const [cocktail, setCocktail] = useState<Cocktail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const addToFavorites = (): void => {
    if (!cocktail) return;

    const existing = JSON.parse(localStorage.getItem("favorites") || "[]");
    const alreadyExists = existing.some(
      (fav: Cocktail) => fav.id === cocktail.id
    );

    if (alreadyExists) {
      alert("This cocktail is already in your favorites!");
      return;
    }

    const updated = [...existing, cocktail];
    localStorage.setItem("favorites", JSON.stringify(updated));
    alert("The cocktail has been added to you favorites!");
  };

  useEffect(() => {
    const fetchCocktail = async () => {
      try {
        const res = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await res.json();
        const drink = data.drinks?.[0];

        if (drink) {
          const mapped = mapRawCocktailData(drink);
          setCocktail(mapped);
        }
      } catch (error) {
        console.error("Error whiel fetching:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCocktail();
  }, [id]);

  if (loading) return <p>Loading cocktail...</p>;
  if (!cocktail) return <p>No cocktail found.</p>;

  return (
    <div className="cocktail-info">
      <h2>{cocktail.name}</h2>
      <img className="cocktail-img" src={cocktail.image} alt={cocktail.name} />
      <br />
      <button className="favorite-button" onClick={addToFavorites}>
        ⭐ Favorite
      </button>
      <div className="wrapper">
        <p>Category: {cocktail.category}</p>
        <p>Glass: {cocktail.glass}</p>
      </div>
      <h3>Ingredients:</h3>
      <IngredientList ingredients={cocktail.ingredients} />
    </div>
  );
};

export default CocktailInfoPage;
