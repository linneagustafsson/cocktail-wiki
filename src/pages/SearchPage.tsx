import { useState } from "react";
import CocktailCard from "../components/CocktailCard";
import { mapRawCocktailData } from "../utils/mapRawCocktailData";
import type { Cocktail } from "../types/cocktail";
import AdvancedSearchForm from "../components/AdvancedSearchForm";
import { MartiniLoader } from "../components/MartiniLoader";

import "../styles/components/SearchPage.css";

const SearchPage = (): React.ReactElement => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Cocktail[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [category, setCategory] = useState("");
  const [glass, setGlass] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [isAlcoholFree, setIsAlcoholFree] = useState(false);

  const handleChange = (field: string, value: string) => {
    if (field === "query") setQuery(value);
    if (field === "category") setCategory(value);
    if (field === "glass") setGlass(value);
    if (field === "ingredient") setIngredient(value);
  };

  const handleToggleAlcoholFree = () => {
    setIsAlcoholFree((prev) => !prev);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setCurrentPage(1);

    try {
      let url = "";

      if (query.trim().length >= 2) {
        url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`;
      } else if (ingredient) {
        url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
      } else if (category) {
        url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
      } else if (glass) {
        url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=${glass}`;
      } else if (isAlcoholFree) {
        url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic`;
      } else {
        setError("Fill in at least one field to search");
        setLoading(false);
        return;
      }

      const res = await fetch(url);
      const data = await res.json();
      const drinks = data.drinks || [];

      const formatted = drinks.map(mapRawCocktailData);
      setResults(formatted);
    } catch (err) {
      console.error("Wrong search:", err);
      setError(
        "Oops! Something went wrong during the search. Please try again"
      );
    } finally {
      setLoading(false);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentResults = results.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(results.length / itemsPerPage);

  return (
    <div className="search-page">
      <h2 className="search-page__heading">
        Search cocktails by name or ingredient
      </h2>

      <div className="search-page__form-wrapper">
        <AdvancedSearchForm
          query={query}
          category={category}
          glass={glass}
          ingredient={ingredient}
          isAlcoholFree={isAlcoholFree}
          onChange={handleChange}
          onToggleAlcoholFree={handleToggleAlcoholFree}
          onSubmit={handleSearch}
        />
      </div>

      {error && <p className="search-page__error">{error}</p>}
      {loading && <MartiniLoader />}

      <div className="search-page__results-wrapper">
        {results.length > 0 ? (
          <>
            <div className="search-page__results">
              {currentResults.map((cocktail) => (
                <CocktailCard
                  key={cocktail.id}
                  id={cocktail.id}
                  name={cocktail.name}
                  image={cocktail.image}
                />
              ))}
            </div>
            <div className="search-page__pagination">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1 || loading}
                className="search-page__button"
              >
                Previous
              </button>

              <span className="search-page__page-info">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages || loading}
                className="search-page__button"
              >
                Next
              </button>
            </div>
          </>
        ) : (
          !loading && (
            <p className="search-page__empty">We couldn’t find any matches.</p>
          )
        )}
      </div>
    </div>
  );
};

export default SearchPage;
