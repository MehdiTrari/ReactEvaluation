import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importer useNavigate pour la navigation
import './Liste.css';
import { useAtom } from 'jotai';
import { cartAtom } from './atoms/cartAtom'; // Importer l'atom du panier


const Liste = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate(); // Hook pour la navigation
  const [cart, setCart] = useAtom(cartAtom); // Hook pour accéder à l'état du panier

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

  const handleViewDetails = (id) => {
    navigate(`/product/${id}`); // Redirection vers la page des détails du produit avec l'ID
  };

  const handleAddToCart = (product) => {
    setCart([...cart, product]); // Ajouter le produit au panier global
    console.log('Produit ajouté au panier:', product);
  };

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
              // Ajout de l'événement onClick sur la div entière pour rediriger
              <div key={product.id} className="product-item" onClick={() => handleViewDetails(product.id)}>
                <img src={product.image} alt={product.name} />
                <h2>{product.name}</h2>
                <p>{product.price} €</p>
                <p>{product.gender}</p>
                <p>{product.description.substring(0, 100)}...</p>
                <button onClick={(e) => { e.stopPropagation(); handleViewDetails(product.id); }}>Voir Détails</button>
                <button onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}>Ajouter au Panier</button>
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
