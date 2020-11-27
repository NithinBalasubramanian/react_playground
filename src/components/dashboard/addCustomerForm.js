import React from 'react';
import './dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function addCustomerForm() {
    return (
        <>
            <div className="formPart row">
                <div className="col-md-12 ">
                    <form className="row">
                        <div className="form-group col-md-6">
                            <label>Customer Name :* </label>
                            <input type="text" className="form-control"></input>
                        </div>
                        <div className="form-group col-md-6">
                            <label>Customer Email :* </label>
                            <input type="email" className="form-control"></input>
                        </div>
                        <div className="form-group col-md-6">
                            <label>Customer Contact :* </label>
                            <input type="text" className="form-control"></input>
                        </div>
                        <div className="form-group col-md-6">
                            <label>Customer Secondary Contact : </label>
                            <input type="text" className="form-control"></input>
                        </div>
                        <div className="form-group col-md-6">
                            <label>Address : </label>
                            <textarea type="text" rows="5" className="form-control"></textarea>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default addCustomerForm;
