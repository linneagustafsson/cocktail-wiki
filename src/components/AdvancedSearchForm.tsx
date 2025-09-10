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
          placeholder="Ex: Margarita"
          className="search-form__input"
        />
        <input
          type="text"
          value={category}
          onChange={(e) => onChange("category", e.target.value)}
          placeholder="Kategori, ex cocktail"
          className="search-form__input"
        />
        <input
          type="text"
          value={glass}
          onChange={(e) => onChange("glass", e.target.value)}
          placeholder="Glas, ex margarita glass"
          className="search-form__input"
        />
        <input
          type="text"
          value={ingredient}
          onChange={(e) => onChange("ingredient", e.target.value)}
          placeholder="Ingrediens"
          className="search-form__input"
        />
      </div>

      <div className="search-form__options">
        {" "}
        {/* 🔹 NYTT */}
        <label
          htmlFor="alcohol-free"
          title="Filtrera bort alkoholhaltiga drinkar"
          className="search-form__checkbox"
        >
          <input
            id="alcohol-free"
            type="checkbox"
            checked={isAlcoholFree}
            onChange={onToggleAlcoholFree}
          />
          Visa endast alkoholfria
        </label>
        <button type="submit" className="search-form__button">
          Sök
        </button>
      </div>
    </form>
  );
};

export default AdvancedSearchForm;
