import React from 'react'
import './dashboard.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddEmployeeForm from './addEmployeeForm';

function add_employee() {
    return (
        <>
            <div className="headerCart row">
                <h1 className="col-md-8">Add Employee</h1>
                <div className="col-md-4">
                    <Link to="/dashboard/Employee" className="sideButton">
                        List Employee
                    </Link>
                </div>
            </div>
            <div className="mainCart">
                <h1>Employee Form</h1>
                <AddEmployeeForm />
            </div>
        </>
    )
}

export default add_employee
