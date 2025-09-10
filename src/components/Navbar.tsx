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
          Hem
        </Link>
        <Link className="link search" to="/search">
          Sök
        </Link>
        <Link className="link example-drink" to="/cocktail/11007">
          Exempeldrink
        </Link>
        <Link className="link favorites" to="/favorites">
          Favoriter
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
