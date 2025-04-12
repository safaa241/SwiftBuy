import React, { useContext } from 'react';
import { FavoriteContext } from './FavoritesContext'; // Importer le contexte des favoris
import 'bootstrap/dist/css/bootstrap.min.css';

function FavoritePage() {
  const { favorites, removeFromFavorites } = useContext(FavoriteContext); // Récupérer les favoris et la fonction de suppression

  return (
    <div className="container mt-4">
      <h2>Mes Favoris</h2>

      {/* Si aucun favori n'est ajouté */}
      {favorites.length === 0 ? (
        <div className="alert alert-warning">
          Vous n'avez pas encore ajouté de produits aux favoris.
        </div>
      ) : (
        <div className="row">
          {favorites.map((product) => (
            <div key={product.id} className="col-4 mb-3">
              <div className="card h-100">
                <img
                  src={product.thumbnail}
                  className="card-img-top img-fluid"
                  alt={product.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column">
                  <h3>{product.title}</h3>
                  <p>{product.description}</p>
                  <p><strong>Prix:</strong> {product.price}€</p>
                  <button
                    className="btn btn-danger mt-auto"
                    onClick={() => removeFromFavorites(product.id)} // Supprimer du favoris
                  >
                    Supprimer des favoris
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritePage;
