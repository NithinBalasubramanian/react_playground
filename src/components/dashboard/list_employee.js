import React from 'react';
import './dashboard.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListEmployee from './listEmployeeData';

function list_employee() {
    return (
        <>
            <div className="headerCart row">
                <h1 className="col-md-8">List Employee</h1>
                <div className="col-md-4">
                    <Link to="/dashboard/Employee/AddEmployee" className="sideButton ">
                        Add Employee
                    </Link>
                </div>
            </div>
            <div className="mainCart">
                <h1>Employee List</h1>
                <ListEmployee />
            </div>
        </>
    )
}

export default list_employee;
