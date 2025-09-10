import type { Cocktail, Ingredient } from "../types/cocktail.ts";

export const mapRawCocktailData = (drink: any): Cocktail => {
  const ingredients: Ingredient[] = [];

  for (let i = 1; i <= 15; i++) {
    const name = drink[`strIngredient${i}`];
    const measure = drink[`strMeasure${i}`];
    if (name) {
      ingredients.push({ name, measure: measure || "" });
    }
  }

  return {
    id: drink.idDrink,
    name: drink.strDrink,
    image: drink.strDrinkThumb,
    category: drink.strCategory,
    glass: drink.strGlass,
    tags: drink.strTags?.split(",") || [],
    ingredients,
  };
};
