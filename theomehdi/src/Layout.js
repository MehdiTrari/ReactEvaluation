import React from 'react';
import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'; // Importer l'icône de panier
import { cartAtom } from './atoms/cartAtom'; // Importer l'atom du panier
import './Layout.css'; // Importer le fichier CSS

const Layout = ({ children }) => {
  const [cart] = useAtom(cartAtom); // Accéder au panier global

  return (
    <div className="layout">
      {/* Header */}
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

      {/* Contenu principal */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <footer>
        <p>© 2024 - Mon e-commerce de chaussures</p>
      </footer>
    </div>
  );
};

export default Layout;
