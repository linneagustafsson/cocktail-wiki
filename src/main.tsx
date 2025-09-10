import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/base.css";
import "./styles/layout.css";
import "./styles/components/Navbar.css";
import "./styles/components/CocktailCard.css";
import "./styles/components/CocktailInfoPage.css";
import "./styles/components/Favorites.css";
import "./styles/components/LandingPage.css";
import "./styles/components/AdvancedSearchForm.css";
import "./styles/components/SearchPage.css";
import "./styles/components/IngredientPage.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
