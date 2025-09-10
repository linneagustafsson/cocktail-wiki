// App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SearchPage from "./pages/SearchPage";
import CocktailInfoPage from "./pages/CocktailInfoPage";
import Navbar from "./components/Navbar";
import type { ReactElement } from "react";
import IngredientPage from "./pages/IngredientPage";
import NotFoundPage from "./pages/NotFoundPage";
import Favorites from "./pages/Favorites";
import "./styles/App.css";

function App(): ReactElement {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/cocktail/:id" element={<CocktailInfoPage />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/ingredient/:name" element={<IngredientPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
