import React from 'react';
import './dashboard.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListCustomer from './listCustomerData';

function list_customer() {
    return (
        <>
            <div className="headerCart row">
                <h1 className="col-md-8">List Customer</h1>
                <div className="col-md-4">
                    <Link to="/dashboard/Customer/AddCustomer" className="sideButton ">
                        Add Customer
                    </Link>
                </div>
            </div>
            <div className="mainCart">
                <h1>Customer List</h1>
                <ListCustomer />
            </div>
        </>
    )
}

export default list_customer
