import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import "../styles/components/CocktailCard.css";

type Props = {
  id: string;
  name: string;
  image: string;
};

const CocktailCard = ({ id, name, image }: Props): ReactElement => {
  return (
    <Link to={`/cocktail/${id}`}>
      <div className="cocktail-card">
        <h3 className="cocktail-card__title">{name}</h3>
        <img
          src={image}
          alt={name}
          width={150}
          className="cocktail-card__image"
        />
      </div>
    </Link>
  );
};

export default CocktailCard;
