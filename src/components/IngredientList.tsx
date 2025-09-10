import type { ReactElement } from "react";
import { Link } from "react-router-dom";

type Ingredient = {
  name: string;
  measure: string;
};

type Props = {
  ingredients: Ingredient[];
};

const IngredientList = ({ ingredients }: Props): ReactElement => {
  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {ingredients.map((ing, index) => {
        const imageUrl = `https://www.thecocktaildb.com/images/ingredients/${encodeURIComponent(
          ing.name
        )}-Medium.png`;

        return (
          <li
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <Link to={`/ingredient/${ing.name}`}>
              <img
                src={imageUrl}
                alt={ing.name}
                width={50}
                style={{ marginRight: "1rem", borderRadius: "4px" }}
              />
            </Link>
            <span>
              <Link
                to={`/ingredient/${ing.name}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <strong>{ing.name}</strong>
              </Link>{" "}
              – {ing.measure}
            </span>
          </li>
        );
      })}
    </ul>
  );
};

export default IngredientList;
