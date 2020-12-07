import React from 'react'
import ListProduct from './listProductData'
import { Link } from 'react-router-dom'

function list_product() {
    return (
        <>
        <div className="headerCart row">
            <h1 className="col-md-8">List Product</h1>
            <div className="col-md-4">
                <Link to="/dashboard/Product/AddProduct" className="sideButton ">
                    Add Product
                </Link>
            </div>
        </div>
        <div className="mainCart">
            <h1>Product List</h1>
            <ListProduct />
        </div>
    </>
    )
}

export default list_product
