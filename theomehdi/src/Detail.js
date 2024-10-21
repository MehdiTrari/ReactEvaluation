import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Detail() {
  const { id } = useParams(); // Récupère l'ID du produit depuis l'URL
  const [product, setProduct] = useState(null); // État pour stocker les détails du produit
  const [error, setError] = useState(null); // État pour les erreurs éventuelles

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

  return (
    <div>
      <h1>Détail du Produit : {product.name}</h1>
      <img src={product.image} alt={product.name} />
      <p>Prix : {product.price} €</p>
      <p>Genre : {product.gender}</p>
      <p>Description : {product.description}</p>
    </div>
  );
}

export default Detail;
