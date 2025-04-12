import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';  // Importer le contexte du panier
import { FavoriteContext } from './FavoritesContext';  // Importer le contexte des favoris
import { Spinner } from 'react-bootstrap';  // Spinner de bootstrap

function ProductDetailPage() {
    const { id } = useParams(); // récupère l'id depuis l'URL
    const navigate = useNavigate();
    const [product, setProduct] = useState(null); // un seul produit, pas un tableau
    const { addToCart } = useContext(CartContext); // Récupérer la fonction d'ajout au panier
    const { addToFavorites } = useContext(FavoriteContext); // Récupérer la fonction d'ajout aux favoris

    const handleAddToCart = () => {
        addToCart(product); // Ajouter au panier
        navigate('/cart'); // Rediriger vers la page panier
    };

    const handleAddToFavorites = () => {
        addToFavorites(product); // Ajouter aux favoris
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`https://dummyjson.com/products/${id}`);
                const data = await res.json();
                setProduct(data);
            } catch (error) {
                console.error("Erreur de chargement du produit :", error);
            }
        };
        
        fetchProduct();
    }, [id]);

    if (!product) {
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Chargement...</span>
            </Spinner>
        );
    }

    return (
        <div className="container mt-4">
            <h1>{product.title}</h1>
            <img src={product.thumbnail} className="img-fluid" alt={product.title} />
            <p className="mt-2">{product.description}</p>
            <p className="mt-2"><strong>Prix:</strong> {product.price}€</p>

            <div className="mt-3 d-flex gap-2">
                <button className="btn btn-secondary" onClick={handleAddToCart}>
                    Ajouter au panier
                </button>
                <button className="btn btn-outline-warning" onClick={handleAddToFavorites}>
                    Ajouter aux favoris
                </button>
            </div>
        </div>
    );
}

export default ProductDetailPage;
