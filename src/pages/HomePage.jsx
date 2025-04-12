import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from './CartContext'; // Gardez ce contexte pour le panier
import { FavoriteContext } from './FavoritesContext'; // Importer le contexte des favoris
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function HomePage() {
  const [quantities, setQuantities] = useState({});
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext); // Contexte du panier
  const { addToFavorites } = useContext(FavoriteContext); // Contexte des favoris
  const [alert, setAlert] = useState('');

  // Gérer la quantité sélectionnée
  const handleCountChange = (productId, value) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: parseInt(value, 10)
    }));
  };

  // Récupérer les produits depuis l'API
  const fetchProducts = async () => {
    const data = await fetch("https://dummyjson.com/products");
    const json = await data.json();
    setProducts(json.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Ajouter un produit au panier
  const handleAddToCart = (product) => {
    const quantity = quantities[product.id] || 1;
    addToCart(product, quantity);
    setAlert(`Le produit ${product.title} a été ajouté au panier!`);
    setTimeout(() => setAlert(''), 3000); // Ferme l'alerte après 3 secondes
  };

  // Ajouter un produit aux favoris
  const handleAddToFavorites = (product) => {
    addToFavorites(product);
    setAlert(`Le produit ${product.title} a été ajouté aux favoris!`);
    setTimeout(() => setAlert(''), 3000); // Ferme l'alerte après 3 secondes
  };

  return (
    <div className="container mt-4">
      <h2>Les produits les plus populaires</h2>

      {/* Afficher l'alerte */}
      {alert && <div className="alert alert-success">{alert}</div>}

      <div className="row">
        {products.map(product => (
          <div key={product.id} className="col-4 mb-3">
            <div className="card h-100">
              <Link to={`/product/${product.id}`} className="text-decoration-none text-dark">
                <img
                  src={product.thumbnail}
                  className="card-img-top img-fluid"
                  alt={product.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              </Link>
              <div className="card-body d-flex flex-column">
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <p><strong>Prix:</strong> {product.price}€</p>
                <div className="form-group mt-auto">
                  <label>Quantité:</label>
                  <input
                    type="number"
                    className="form-control w-50"
                    value={quantities[product.id] || 1}
                    onChange={(e) => handleCountChange(product.id, e.target.value)}
                    min="1"
                  />
                </div>
                <div className="mt-3 d-flex flex-wrap gap-2">
                  <button
                    className="btn btn-info"
                    onClick={() => handleAddToCart(product)}
                  >
                    Ajouter au panier
                  </button>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => handleAddToFavorites(product)}
                  >
                    Ajouter aux favoris
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
