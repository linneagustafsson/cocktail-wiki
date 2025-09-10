import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { mapRawCocktailData } from "../utils/mapRawCocktailData";
import type { Cocktail, IngredientDetails } from "../types/cocktail";
import CocktailCard from "../components/CocktailCard";

const IngredientPage = (): React.ReactElement => {
  const { name } = useParams();
  const [ingredient, setIngredient] = useState<IngredientDetails | null>(null);
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchIngredientDetails = async () => {
      try {
        const res = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${name}`
        );
        const data = await res.json();
        const info = data.ingredients?.[0];

        if (info) {
          setIngredient({
            name: info.strIngredient,
            description: info.strDescription,
            type: info.strType,
            isAlcohol: info.strAlcohol === "Yes",
            abv: info.strABV,
          });
        }
      } catch (error) {
        console.error("Fel vid hämtning av ingrediens:", error);
      }
    };

    const fetchCocktailsWithIngredient = async () => {
      try {
        const res = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${name}`
        );
        const data = await res.json();
        const drinks = data.drinks || [];

        const formatted = drinks.map(mapRawCocktailData);
        setCocktails(formatted);
      } catch (error) {
        console.error("Fel vid hämtning av cocktails:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIngredientDetails();
    fetchCocktailsWithIngredient();
  }, [name]);

  if (loading) return <p>Loading ingredient...</p>;
  if (!ingredient) return <p>No information found on {name}.</p>;

  return (
    <div className="ingredient-page">
      <h2 className="ingredient-heading">{ingredient.name}</h2>

      {ingredient.description && (
        <div className="ingredient-description">
          <p>{ingredient.description}</p>
        </div>
      )}

      <ul className="ingredient-info">
        {ingredient.type && <li>Type: {ingredient.type}</li>}
        <li>Alcohol: {ingredient.isAlcohol ? "Yes" : "No"}</li>
        {ingredient.abv && <li>ABV: {ingredient.abv}%</li>}
      </ul>

      <h3 className="ingredient-subheading">
        Drinks containing {ingredient.name}:
      </h3>

      <div className="ingredient-drinks">
        {cocktails.map((cocktail) => (
          <Link key={cocktail.id} to={`/cocktail/${cocktail.id}`}>
            <div className="favorites-page__card">
              <CocktailCard
                id={cocktail.id}
                name={cocktail.name}
                image={cocktail.image}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default IngredientPage;
