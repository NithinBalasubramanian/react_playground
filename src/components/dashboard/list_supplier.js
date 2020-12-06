import React from 'react';
import './dashboard.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListSupplier from './listSupplierData';

function list_supplier() {
    return (
        <>
            <div className="headerCart row">
                <h1 className="col-md-8">List Supplier</h1>
                <div className="col-md-4">
                    <Link to="/dashboard/Supplier/AddSupplier" className="sideButton ">
                        Add Supplier
                    </Link>
                </div>
            </div>
            <div className="mainCart">
                <h1>Supplier List</h1>
                <ListSupplier />
            </div>
        </>
    )
}

export default list_supplier;
