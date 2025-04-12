import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function SearchPage() {
  const [products, setProducts] = useState([]);  // Liste de tous les produits
  const [searchResults, setSearchResults] = useState([]);  // Résultats de recherche filtrés
  const [loading, setLoading] = useState(true);  // Indicateur de chargement
  const location = useLocation();  // Pour accéder aux paramètres de l'URL

  // Fonction pour extraire la requête de recherche depuis l'URL
  const getQueryParameter = () => {
    const params = new URLSearchParams(location.search);
    return params.get('q');
  };

  // Charger les produits depuis l'API
  const fetchProducts = async () => {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    setProducts(data.products);
  };

  // Filtrer les produits en fonction de la requête de recherche
  const filterProducts = (query) => {
    if (!query) return [];
    return products.filter(
      (product) =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
    );
  };

  // Appeler l'API pour charger les produits et filtrer en fonction de la recherche
  useEffect(() => {
    fetchProducts();
  }, []);

  // Mettre à jour les résultats de la recherche chaque fois que la requête change ou que les produits sont chargés
  useEffect(() => {
    const query = getQueryParameter();
    if (products.length > 0) {
      const results = filterProducts(query);
      setSearchResults(results);
    }
    setLoading(false);  // Stopper le chargement après la récupération des données
  }, [location, products]);  // Déclenche aussi lorsque les produits sont chargés

  if (loading) {
    return (
      <div className="container mt-4 text-center">
        <h2>Chargement...</h2>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Résultats de la recherche pour: "{getQueryParameter()}"</h2>
      <div className="row">
        {searchResults.length === 0 ? (
          <div className="col-12">
            <p>Aucun produit trouvé.</p>
          </div>
        ) : (
          searchResults.map((product) => (
            <div key={product.id} className="col-4 mb-3">
              <div className="card h-100">
                <Link to={`/product/${product.id}`} className="text-decoration-none text-dark">
                  <img
                    src={product.thumbnail}
                    className="card-img-top img-fluid"
                    alt={product.title}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                </Link>
                <div className="card-body d-flex flex-column">
                  <h3>{product.title}</h3>
                  <p>{product.description}</p>
                  <p><strong>Prix:</strong> {product.price}€</p>
                  <Link to={`/product/${product.id}`} className="btn btn-info mt-auto">Voir le produit</Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SearchPage;
