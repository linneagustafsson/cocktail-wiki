import type { ReactElement } from "react";
import "../styles/components/AdvancedSearchForm.css";

type Props = {
  query: string;
  category: string;
  glass: string;
  ingredient: string;
  isAlcoholFree: boolean;
  onChange: (field: string, value: string) => void;
  onToggleAlcoholFree: () => void;
  onSubmit: (e: React.FormEvent) => void;
};

const AdvancedSearchForm = ({
  query,
  category,
  glass,
  ingredient,
  isAlcoholFree,
  onChange,
  onToggleAlcoholFree,
  onSubmit,
}: Props): ReactElement => {
  return (
    <form className="search-form" onSubmit={onSubmit}>
      <div className="search-form__group">
        <input
          type="text"
          value={query}
          onChange={(e) => onChange("query", e.target.value)}
          placeholder="E.g Margarita"
          className="search-form__input"
        />
        <input
          type="text"
          value={category}
          onChange={(e) => onChange("category", e.target.value)}
          placeholder="Category, e.g cocktail"
          className="search-form__input"
        />
        <input
          type="text"
          value={glass}
          onChange={(e) => onChange("glass", e.target.value)}
          placeholder="Glass, e.g margarita glass"
          className="search-form__input"
        />
        <input
          type="text"
          value={ingredient}
          onChange={(e) => onChange("ingredient", e.target.value)}
          placeholder="Ingredient"
          className="search-form__input"
        />
      </div>

      <div className="search-form__options">
        {" "}
        <label
          htmlFor="alcohol-free"
          title="Filter alcohol free drinks"
          className="search-form__checkbox"
        >
          <input
            id="alcohol-free"
            type="checkbox"
            checked={isAlcoholFree}
            onChange={onToggleAlcoholFree}
          />
          Show only non-alcoholic drinks
        </label>
        <button type="submit" className="search-form__button">
          Search
        </button>
      </div>
    </form>
  );
};

export default AdvancedSearchForm;
