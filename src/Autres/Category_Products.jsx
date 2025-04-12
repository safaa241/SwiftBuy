import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Loader from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';


function CategoryProductsPage(){
  const productCat = useParams();
  const [categoryProduct, setCategoryProduct] = useState();

  useEffect (() => {
    const fetchProductsCategory = async () => {
      // try par categories
      try{
        const response = await fetch(`https://dummyjson.com/products?category/${productCat.category} `);
        const data = await response.json();
        setCategoryProduct (data.products);
      } catch (error) {
        console.error(error);
        }
        
        }
        fetchProductsCategory();
        }, [productCat.category]);

  if (!categoryProduct) {
    return (
      <Loader animation="border" role="status">
                <span className="visually-hidden">Chargement...</span>
            </Loader>
    )
    }
  

  return (
    <div className="container mt-4">
      <h1>Category Products</h1>
      <div className="row ">
        {categoryProduct.map((product, index) => (
          <div key={index} className="col-md-3">
            <div className="card ">
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">Price: ${product.price}</p>
              </div>
            </div>
          </div>
        ))};
        </div>
    </div>
  );
}
export default CategoryProductsPage;