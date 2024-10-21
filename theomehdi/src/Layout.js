import React from 'react';
import { Link } from 'react-router-dom';
import './Layout.css'; // Importer le fichier CSS

const Layout = ({ children }) => {
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
              <Link to="/panier">Panier</Link>
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
