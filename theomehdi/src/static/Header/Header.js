// src/static/header/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header>
      <nav className="navbar">
        <Link to="/" className="logo">
          Chaussures
        </Link>
        <ul>
          <li>
            <Link to="/">Accueil</Link>
          </li>
          <li>
            <Link to="/panier">Panier</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
