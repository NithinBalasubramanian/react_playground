import React from 'react';
import './dashboard.css';
import Customer from './list_customer';
import AddCustomer from './add_customer';
import Employee from './list_employee';
import AddEmployee from './add_employee';
import Supplier from './list_supplier';
import AddSupplier from './add_supplier';
import AddProduct from './add_product';
import Product from './list_product';
import Dashboard from './dashboard';
import Invoice from './add_invoice';
import { Switch , Route} from 'react-router-dom';

function Maincont() {
    return(
        <div className="mainContCart">
        <Switch>
            <Route path="/dashboard" exact>
                <Dashboard />
            </Route>
            <Route path="/dashboard/Customer" exact>
                <Customer />
            </Route>
            <Route path="/dashboard/Customer/AddCustomer">
                <AddCustomer />
            </Route>
            <Route path="/dashboard/Employee" exact>
                <Employee />
            </Route>
            <Route path="/dashboard/Employee/AddEmployee">
                <AddEmployee />
            </Route>
            <Route path="/dashboard/Supplier" exact>
                <Supplier />
            </Route>
            <Route path="/dashboard/Supplier/AddSupplier" >
                <AddSupplier />
            </Route>
            <Route path="/dashboard/Product" exact>
                <Product />
            </Route>
            <Route path="/dashboard/Product/AddProduct" >
                <AddProduct />
            </Route>
            <Route path="/dashboard/Invoice" >
                <Invoice />
            </Route>
        </Switch>
        </div>
    )
}

export default Maincont;
