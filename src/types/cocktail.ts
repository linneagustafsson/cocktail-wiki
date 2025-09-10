export type Ingredient = {
  name: string;
  measure: string;
};

export type Cocktail = {
  id: string;
  name: string;
  image: string;
  category?: string;
  glass?: string;
  tags?: string[];
  ingredients: Ingredient[];
};
export type IngredientDetails = {
  name: string;
  description?: string;
  type?: string;
  isAlcohol?: boolean;
  abv?: string;
};
