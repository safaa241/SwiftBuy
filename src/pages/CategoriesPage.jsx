import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';

function CategoriesPage() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://dummyjson.com/products/categories');

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                const formattedCategories = Array.isArray(data)
                    ? data.map(item => {
                        if (typeof item === 'string') return item;
                        if (typeof item === 'object' && item !== null) {
                            return item.name || item.slug || item.title || JSON.stringify(item);
                        }
                        return String(item);
                    })
                    : [];

                setCategories(formattedCategories);
                setError(null);
            } catch (error) {
                console.error("Error fetching categories:", error);
                setError(error.message);
                setCategories([]);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleCategoryClick = (categoryName) => {
        if (typeof categoryName === 'string') {
            navigate(`/categories/${encodeURIComponent(categoryName)}`);
        }
    };

    if (loading) {
        return (
            <div className="text-center mt-5">
                <Spinner animation="border" role="status" variant="primary">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-5">
                <Alert variant="danger">
                    <Alert.Heading>Error loading categories</Alert.Heading>
                    <p>{error}</p>
                    <p>Please try again later.</p>
                </Alert>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h1 className="mb-4 text-center">🗂️ Product Categories</h1>
            {categories.length === 0 ? (
                <Alert variant="info">No categories found.</Alert>
            ) : (
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    {categories.map((categoryName, index) => {
                        const displayName = typeof categoryName === 'string'
                            ? categoryName.replace(/-/g, ' ')
                            : 'Unnamed Category';

                        return (
                            <div className="col" key={index}>
                                <div className="card border-0 shadow-sm h-100" style={{ transition: 'transform 0.2s ease-in-out' }}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                                    <div className="card-body d-flex justify-content-between align-items-center">
                                        <h5 className="card-title text-capitalize mb-0">📦 {displayName}</h5>
                                        <button
                                            className="btn btn-outline-primary btn-sm"
                                            onClick={() => handleCategoryClick(categoryName)}
                                        >
                                            View
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default CategoriesPage;
