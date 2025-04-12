import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

function CategoryProductsPage() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    const res = await fetch(`https://dummyjson.com/products/category/${decodeURIComponent(category)}`);
    const data = await res.json();
    setProducts(data.products);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [category]);

  if (loading) {
    return (
      <div className="text-center mt-4">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1 className="text-capitalize mb-4">{decodeURIComponent(category).replace(/-/g, ' ')} Products</h1>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <Card style={{ height: '100%' }}>
              <Card.Img
                variant="top"
                src={product.thumbnail}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{product.title}</Card.Title>
                <Card.Text className="flex-grow-1">
                  {product.description.length > 50
                    ? product.description.substring(0, 50) + '...'
                    : product.description}
                </Card.Text>
                <div className="mt-auto">
                  <p className="fw-bold">${product.price}</p>
                  <Button
                    variant="primary"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    View Details
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryProductsPage;
