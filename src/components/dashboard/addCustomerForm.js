import React from 'react';
import './dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function addCustomerForm() {

    const formSubmitHandler = (e) => {
        e.preventDefault();
        let data = {
            id : 12
        }
        axios.post("http://localhost/react_play/Api/insert/customer",data)
        .then(response => { console.log(response) })
        .catch(error => { console.log(error) })
    }
    return (
        <>
            <div className="formPart row">
                <div className="col-md-12 ">
                    <form className="row" onSubmit={ formSubmitHandler }>
                        <div className="form-group col-md-6">
                            <label>Customer Name :* </label>
                            <input type="text" className="form-control" name="c_name"></input>
                        </div>
                        <div className="form-group col-md-6">
                            <label>Customer Email :* </label>
                            <input type="email" className="form-control" name="c_email"></input>
                        </div>
                        <div className="form-group col-md-6">
                            <label>Customer Contact :* </label>
                            <input type="text" className="form-control" name="c_contact"></input>
                        </div>
                        <div className="form-group col-md-6">
                            <label>Customer Secondary Contact : </label>
                            <input type="text" className="form-control" name="c_sec_contact"></input>
                        </div>
                        <div className="form-group col-md-6">
                            <label>Address : </label>
                            <textarea type="text" rows="5" className="form-control" name="address"></textarea>
                        </div>
                        <div className="col-md-12">
                            <button type="submit" className="sideButton submitButton">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default addCustomerForm;
