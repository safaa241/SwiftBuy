import React, { useState, useEffect } from 'react';
import Loader from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';

function ProductCat() { 
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            try{
                const response = await fetch(`https://dummyjson.com/products/categories/${products}`);
                const data = await response.json();
                setProducts(data);
                } catch (error) {
                    console.error(error);
                }
            };fetchProduct()
        }, [products]);
        if (!products){
            return <Loader key="loader" animation="border" variant="primary" />;
        }

        return(
            <div className=' container'>
                <h1>Product Categories</h1>
                <ul>
                    {products.map((product, index) => (
                        <li key={index}>{product.title}</li>
                        ))}
                </ul>
            </div>
        );
    }

export default ProductCat;
