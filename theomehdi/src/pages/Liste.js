import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/Liste.css';
import { useAtom } from 'jotai';
import { cartAtom } from '../atoms/cartAtom';

const Liste = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(false); // État pour la notification
  const navigate = useNavigate();
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
    navigate(`/product/${id}`);
  };

  const handleAddToCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    setNotification(true); // Afficher la notification
    setTimeout(() => setNotification(false), 2000); // Masquer la notification après 2 secondes
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

      {/* Afficher la notification */}
      {notification && <div className="notification">Produit ajouté au panier !</div>}
    </div>
  );
};

export default Liste;
