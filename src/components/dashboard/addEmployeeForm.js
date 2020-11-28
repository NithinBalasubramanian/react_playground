import React from 'react';
import './dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function addEmployeeForm() {
    return (
        <>
        <div className="formPart row">
            <div className="col-md-12 ">
                <form className="row">
                    <div className="form-group col-md-6">
                        <label>Employee Name :* </label>
                        <input type="text" className="form-control"></input>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Employee Email :* </label>
                        <input type="email" className="form-control"></input>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Employee Contact :* </label>
                        <input type="text" className="form-control"></input>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Employee Secondary Contact : </label>
                        <input type="text" className="form-control"></input>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Address : </label>
                        <textarea type="text" rows="5" className="form-control"></textarea>
                    </div>
                    <div className="col-md-12">
                        <button type="button" className="sideButton submitButton">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </>
    )
}

export default addEmployeeForm
