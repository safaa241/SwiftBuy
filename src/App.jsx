import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/NavBar';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import FavoritePage from './pages/FavoritePage'; // Importer la page des favoris
import CategoriesPage from './pages/CategoriesPage';
import CategoryProductsPage from './pages/CategoryProductsPage';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { CartProvider } from './pages/CartContext';
import { FavoriteProvider } from './pages/FavoritesContext'; // Importer le FavoriteProvider


function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <FavoriteProvider>
          <Navbar />
          <main className="container mt-4">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/favorites" element={<FavoritePage />} /> {/* Route des favoris */}
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/categories/:category" element={<CategoryProductsPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </main>
        </FavoriteProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
