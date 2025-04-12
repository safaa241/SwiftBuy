import React, { useContext } from 'react';
import { CartContext } from './CartContext';

function CartPage() {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);

  // Calculer le total final
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  // Gérer la mise à jour de la quantité
  const handleQuantityChange = (productId, newQuantity) => {
    updateQuantity(productId, newQuantity);
  };

  return (
    <div className="container mt-4">
      <h2>Mon Panier</h2>
      {cartItems.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <div>
          <div className="list-group">
            {cartItems.map(item => (
              <div key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="img-fluid"
                    style={{ width: '50px', marginRight: '15px' }}
                  />
                  <span>{item.title}</span>
                </div>
                <div>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Supprimer
                  </button>
                  <div className="d-flex align-items-center mt-2">
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="form-control form-control-sm mx-2"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                      min="1"
                      style={{ width: '60px' }}
                    />
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <p className="mt-2">Prix: {item.price}€</p>
                  <p><strong>Total: {item.price * item.quantity}€</strong></p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 d-flex justify-content-between align-items-center">
            <h4>Total final: {getTotalPrice()}€</h4>
            <button className="btn btn-primary">Passer à la caisse</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
