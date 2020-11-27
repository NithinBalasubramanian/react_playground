import React from 'react';
import './dashboard.css';
import Customer from './add_customer';
import Employee from './add_employee';
import Supplier from './add_supplier';
import Dashboard from './dashboard';
import { Switch , Route} from 'react-router-dom';

function Maincont() {
    return(
        <div className="mainContCart">
        <Switch>
            <Route path="/dashboard" exact>
                <Dashboard />
            </Route>
            <Route path="/dashboard/Customer">
                <Customer />
            </Route>
            <Route path="/dashboard/Employee">
                <Employee />
            </Route>
            <Route path="/dashboard/Supplier">
                <Supplier />
            </Route>
        </Switch>
        </div>
    )
}

export default Maincont;
