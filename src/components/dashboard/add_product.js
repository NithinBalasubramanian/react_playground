import React from 'react';
import './dashboard.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddProductForm from './addProductForm';

function add_product() {
    return (
        <>
            <div className="headerCart row">
                <h1 className="col-md-8">Add Product</h1>
                <div className="col-md-4">
                    <Link to="/dashboard/Product" className="sideButton">
                        List Product
                    </Link>
                </div>
            </div>
            <div className="mainCart">
                <h1>Product Form</h1>
                <AddProductForm />
            </div>
        </>
    )
}

export default add_product
