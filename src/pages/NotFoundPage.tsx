import type { ReactElement } from "react";
import { Link } from "react-router-dom";

const NotFoundPage = (): ReactElement => {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>404 – Drinken du söker finns inte 🍸</h1>
      <p>
        Antingen är du lite för törstig, eller så har du blandat ihop URL:en.
      </p>
      <img
        src="https://www.thecocktaildb.com/images/ingredients/Lime-Medium.png"
        alt="Lime"
        width={80}
        style={{ margin: "1rem auto", borderRadius: "50%" }}
      />
      <p>Men lugn – vi har massor av andra goda drinkar att bjuda på!</p>
      <Link
        to="/"
        style={{ fontSize: "1.2rem", textDecoration: "none", color: "#0077cc" }}
      >
        🔙 Tillbaka till baren (startsidan)
      </Link>
    </div>
  );
};

export default NotFoundPage;
