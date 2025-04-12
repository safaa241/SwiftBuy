import React from 'react';  
import { Link } from 'react-router-dom';  
import 'bootstrap/dist/css/bootstrap.min.css';  

function Navbar() { 
     
    return (  
        <div className="container-fluid fixed-top">  
            <nav className="navbar navbar-expand-lg navbar-light bg-light">  
                <div className="container-fluid">  
                    <Link className="navbar-brand" to="/">SwiftBuy</Link>  
                    <button className="navbar-toggler"  
                        type="button"  
                        data-bs-toggle="collapse"  
                        data-bs-target="#navbarNav"  
                        aria-controls="navbarNav"  
                        aria-expanded="false"  
                        aria-label="Toggle navigation">  
                        <span className="navbar-toggler-icon"></span>  
                    </button>  
                    <div className="collapse navbar-collapse" id="navbarNav">  
                        <ul className="navbar-nav">  
                            <li className="nav-item">  
                                <Link className="nav-link" to="/">Home</Link>  
                            </li>  
                            <li className="nav-item">  
                                <Link className="nav-link" to="/cart">Cart</Link>  
                            </li>  
                            <li className="nav-item">  
                            <Link className="nav-link" to="/favorites">Favoris</Link> 
                            </li>  
                            <li className="nav-item">  
                            <Link to="/categories" className="nav-link">
    Categories
</Link>  
                            </li>  
                        </ul>  
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />  
                        <button className="btn btn-outline-success" type="submit">Search</button>  
                    </div>  
                    <Link className="btn btn-primary" to="/login">Login</Link>
<Link className="btn btn-secondary" to="/signup">Sign Up</Link>
<Link className="nav-link" to="/login">Logout</Link>  
  
                </div>  
            </nav>  
        </div>  
    );  
}  

export default Navbar;  