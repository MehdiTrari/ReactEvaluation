import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'; // Importer l'icône de panier

const Header = ({ cart }) => (
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
          <Link to="/panier" className="cart-link">
            <FontAwesomeIcon icon={faShoppingCart} /> {/* Icône de panier */}
            {cart.length > 0 && <span className="cart-notification">{cart.length}</span>}
          </Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
