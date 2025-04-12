import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Ajouter un produit au panier
  const addToCart = (product, quantity) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find(item => item.id === product.id);
      if (existing) {
        // Si le produit existe déjà, on met à jour la quantité
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Sinon, on l'ajoute au panier
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  // Supprimer un produit du panier
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== productId));
  };

  // Mettre à jour la quantité d'un produit dans le panier
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return; // Empêche de mettre la quantité à 0 ou moins
    setCartItems((prevItems) => 
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
