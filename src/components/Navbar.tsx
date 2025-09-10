import { useState, type ReactElement } from "react";

import { Link } from "react-router-dom";

import "../styles/components/Navbar.css";

const Navbar = (): ReactElement => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <Link to="/" className="logo-link">
        <h1>Cocktail Wiki</h1>
      </Link>

      <button
        className="hamburger"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      <div className={`wrapper ${menuOpen ? "open" : ""}`}>
        <Link className="link home" to="/">
          Home
        </Link>
        <Link className="link search" to="/search">
          Search
        </Link>
        <Link className="link example-drink" to="/cocktail/11007">
          Example drink
        </Link>
        <Link className="link favorites" to="/favorites">
          Favorites
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
