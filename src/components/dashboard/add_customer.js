import React from 'react';
import './dashboard.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddCustomerForm from './addCustomerForm';

function add_customer() {
    return (
        <>
            <div className="headerCart row">
                <h1 className="col-md-8">Add Customer</h1>
                <div className="col-md-4">
                    <Link to="/dashboard/Customer" className="sideButton">
                        List Customer
                    </Link>
                </div>
            </div>
            <div className="mainCart">
                <h1>Customer Form</h1>
                <AddCustomerForm />
            </div>
        </>
    )
}

export default add_customer
