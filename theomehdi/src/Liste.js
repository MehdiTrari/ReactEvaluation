import React, { useEffect, useState } from 'react';
import './Liste.css'; // Import du fichier CSS


// Composant Liste
function Liste() {
  // État local pour les produits
  const [products, setProducts] = useState([]);

  // Simulation de récupération des produits (Mock)
  useEffect(() => {
    // Appelle les données mockées (en attendant l'intégration de MSW)
    fetch('/api/products') // Chemin de l'API mockée
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Erreur lors de la récupération des produits:', error));
  }, []);

  return (
    <div>
      <h1>Liste des Chaussures</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.price} €</p>
            <p>{product.gender}</p>
            <p>{product.description.substring(0, 100)}...</p>
            <button onClick={() => console.log('Voir détails')}>Voir Détails</button>
            <button onClick={() => console.log('Ajouter au panier')}>Ajouter au Panier</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Liste;
