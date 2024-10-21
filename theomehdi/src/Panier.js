import React from 'react';
import { useAtom } from 'jotai';
import { cartAtom } from './atoms/cartAtom'; // Importer l'atom du panier
import './Panier.css'; // Fichier CSS pour styliser la page

const Panier = () => {
  const [cart, setCart] = useAtom(cartAtom); // Récupère les produits du panier

  // Calculer le montant total
  const totalAmount = cart.reduce((total, product) => total + product.price * product.quantity, 0);

  // Fonction pour supprimer un produit du panier
  const removeFromCart = (id) => {
    setCart(cart.filter((product) => product.id !== id));
  };

  // Fonction pour incrémenter la quantité d'un produit
  const incrementQuantity = (id) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  // Fonction pour décrémenter la quantité d'un produit
  const decrementQuantity = (id) => {
    setCart(cart.map(item =>
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ));
  };

  return (
    <div className="panier-container">
      <h1>Votre Panier</h1>
      {cart.length > 0 ? (
        <div>
          <ul className="panier-list">
            {cart.map((product) => (
              <li key={product.id} className="panier-item">
                <img src={`/${product.image}`} alt={product.name} />
                <div>
                  <h2>{product.name}</h2>
                  <p>Prix unitaire : {product.price} €</p>
                  <p>Total : {(product.price * product.quantity).toFixed(2)} €</p>

                  {/* Gestion des quantités */}
                  <div className="quantity-controls">
                    <button onClick={() => decrementQuantity(product.id)}>-</button>
                    <span>{product.quantity}</span>
                    <button onClick={() => incrementQuantity(product.id)}>+</button>
                  </div>

                  <button className="remove-button" onClick={() => removeFromCart(product.id)}>
                    Supprimer
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="panier-total">
            <h3>Montant total : {totalAmount.toFixed(2)} €</h3>
          </div>
        </div>
      ) : (
        <h3>Votre panier est vide</h3>
      )}
    </div>
  );
};

export default Panier;
