import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { mapRawCocktailData } from "../utils/mapRawCocktailData";
import type { Cocktail } from "../types/cocktail";
import "../styles/components/LandingPage.css";
import { MartiniLoader } from "../components/MartiniLoader";

const LandingPage = (): React.ReactElement => {
  const [cocktail, setCocktail] = useState<Cocktail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchRandomCocktail = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://www.thecocktaildb.com/api/json/v1/1/random.php"
      );
      const data = await res.json();
      const drink = data.drinks?.[0];

      if (drink) {
        const mapped = mapRawCocktailData(drink);
        setCocktail(mapped);
      }
    } catch (error) {
      console.error("Fel vid hämtning:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomCocktail();
  }, []);

  if (loading) return <MartiniLoader />;

  if (!cocktail)
    return <p>Oops! Something went wrong while fetching the cocktail</p>;

  return (
    <div className="landing-page">
      <h2 className="landing-page__heading">Cocktail of the day</h2>
      <img
        src={cocktail.image}
        alt={cocktail.name}
        width={200}
        className="landing-page__image"
      />
      <h3 className="landing-page__name">{cocktail.name}</h3>
      <Link to={`/cocktail/${cocktail.id}`} className="landing-page__link">
        Details
      </Link>
      <br />
      <button
        className="landing-page__button"
        onClick={fetchRandomCocktail}
        disabled={loading}
      >
        {loading ? "Loading..." : "New cocktail"}
      </button>
    </div>
  );
};

export default LandingPage;
