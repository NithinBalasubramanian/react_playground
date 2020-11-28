import React from 'react';
import './dashboard.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddSupplierForm from './addSupplierForm';

function add_supplier() {
    return (
        <>
            <div className="headerCart row">
                <h1 className="col-md-8">Add Supplier</h1>
                <div className="col-md-4">
                    <Link to="/dashboard/Supplier" className="sideButton">
                        List Supplier
                    </Link>
                </div>
            </div>
            <div className="mainCart">
                <h1>Supplier Form</h1>
                <AddSupplierForm />
            </div>
        </>
    )
}

export default add_supplier
