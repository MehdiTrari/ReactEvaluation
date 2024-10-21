import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { cartAtom } from '../atoms/cartAtom';
import '../styles/Detail.css'; // Importer le fichier CSS

function Detail() {
  const { id } = useParams(); // Récupère l'ID du produit depuis l'URL
  const [product, setProduct] = useState(null); // État pour stocker les détails du produit
  const [error, setError] = useState(null); // État pour les erreurs éventuelles
  const [cart, setCart] = useAtom(cartAtom); // Utiliser l'atom du panier
  const [notification, setNotification] = useState(false); // Déclarer l'état pour la notification
  const navigate = useNavigate(); // Hook pour naviguer entre les pages

  // Fetch les détails du produit quand le composant se charge
  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) {
          throw new Error('Erreur lors de la récupération du produit');
        }
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
      // Incrémenter la quantité si le produit est déjà dans le panier
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      // Ajouter un nouveau produit avec une quantité initiale de 1
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    setNotification(true); // Afficher la notification
    setTimeout(() => setNotification(false), 2000); // Masquer la notification après 2 secondes
  };

  const handleGoBack = () => {
    navigate('/'); // Retour à la liste des produits
  };

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  if (!product) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="product-detail">
      <h1>Détail du Produit : {product.name}</h1>
      <img src={`/${product.image}`} alt={product.name} />
      <p>Prix : {product.price} €</p>
      <p>Genre : {product.gender}</p>
      <p>Description : {product.description}</p>

      <div className="button-group">
        <button onClick={handleAddToCart}>Ajouter au Panier</button>
        <button className="back-button" onClick={handleGoBack}>Retour à la Liste</button>
      </div>

      {/* Afficher la notification */}
      {notification && <div className="notification">Produit ajouté au panier !</div>}
    </div>
  );
}

export default Detail;
