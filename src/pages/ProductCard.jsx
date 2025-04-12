import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, onAddToCart, onAddToFavorites }) => {
  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <Link to={`/product/${product.id}`}>
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-48 object-cover"
        />
      </Link>
      
      <div className="p-4">
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="font-medium text-lg mb-1 hover:text-blue-600">{product.name}</h3>
          <p className="text-gray-800 font-bold mb-3">${product.price.toFixed(2)}</p>
        </Link>
        
        <div className="flex justify-between items-center">
          <button 
            onClick={onAddToCart}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
          >
            Ajouter au panier
          </button>
          
          <button 
            onClick={onAddToFavorites}
            className="text-gray-400 hover:text-red-500"
            aria-label="Ajouter aux favoris"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;