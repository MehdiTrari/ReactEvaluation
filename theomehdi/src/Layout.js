import React from 'react';
import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHome } from '@fortawesome/free-solid-svg-icons';
import { cartAtom } from './atoms/cartAtom';
import './Layout.css';

const Layout = ({ children }) => {
  const [cart] = useAtom(cartAtom);
  
  const totalItemsInCart = cart.reduce((total, product) => total + product.quantity, 0);

  return (
    <div className="layout">
      {/* Header */}
      <header>
        <nav className="navbar">
          <Link to="/" className="logo">
            Roubaix Shoes
          </Link>
          <ul>
            <li>
              <Link to="/">
                <FontAwesomeIcon icon={faHome} /> {/* Icône de maison pour Accueil */}
              </Link>
            </li>
            <li>
              <Link to="/panier" className="cart-link">
                <FontAwesomeIcon icon={faShoppingCart} /> {/* Icône de panier */}
                {totalItemsInCart > 0 && <span className="cart-notification">{totalItemsInCart}</span>}
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
        <p>© Wenov 2024 - Trari Mehdi & Dadon Théo </p>
      </footer>
    </div>
  );
};

export default Layout;
