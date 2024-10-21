import React, { useEffect, useState } from "react";
import './Liste.css';

const Liste = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState(""); // Si tu souhaites ajouter un filtre plus tard

  // Fetch des produits mockés depuis MSW
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) {
          throw new Error("Erreur lors de la récupération des produits.");
        }
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Liste des Chaussures</h1>
      {error ? (
        <h3>{error}</h3>
      ) : products.length > 0 ? (
        <div className="product-list">
          {products
            .filter((product) => product.name.toLowerCase().includes(filter.toLowerCase()))
            .map((product) => (
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
      ) : (
        <h3>Loading...</h3>
      )}
    </div>
  );
};

export default Liste;
