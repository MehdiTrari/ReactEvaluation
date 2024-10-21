import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Detail.css'; // Importer le fichier CSS

function Detail() {
  const { id } = useParams(); // Récupère l'ID du produit depuis l'URL
  const [product, setProduct] = useState(null); // État pour stocker les détails du produit
  const [error, setError] = useState(null); // État pour les erreurs éventuelles
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

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  if (!product) {
    return <div>Chargement...</div>;
  }

  const handleAddToCart = () => {
    console.log("Produit ajouté au panier :", product);
    // Logique pour ajouter le produit au panier
  };

  const handleGoBack = () => {
    navigate('/'); // Retour à la liste des produits
  };

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
    </div>
  );
}

export default Detail;
