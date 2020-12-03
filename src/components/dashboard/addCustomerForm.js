import React , { Component } from 'react';
import './dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const initialState = {
    c_name : '',
    c_email : '',
    c_contact : '',
    c_sec_contact : '',
    address : ''
};

class AddCustomerForm extends Component {
    constructor(){
        super()
        this.state = {
            c_name : '',
            c_email : '',
            c_contact : '',
            c_sec_contact : '',
            address : ''
        }
    }

    formSubmitHandler = (e) => {
        e.preventDefault();
        let data = {
            id : 12
        }
        this.setState( initialState );
        axios.post("http://localhost/react_play/Api/insert/customer",data)
        .then(response => { console.log(response) })
        .catch(error => { console.log(error) })
    }

    enterDataHandler = (e) => {
        let now_name = e.target.name;
        let now_value = e.target.value;
        this.setState({ [now_name] : now_value });
    }

    render() {
        return (
            <>
                <div className="formPart row">
                    <div className="col-md-12 ">
                        <form className="row" onSubmit={ this.formSubmitHandler }>
                            <div className="form-group col-md-6">
                                <label>Customer Name :* </label>
                                <input type="text" className="form-control" name="c_name" value={this.state.c_name} onChange={ this.enterDataHandler } ></input>
                            </div>
                            <div className="form-group col-md-6">
                                <label>Customer Email :* </label>
                                <input type="email" className="form-control" name="c_email"  value={this.state.c_email} onChange={ this.enterDataHandler }></input>
                            </div>
                            <div className="form-group col-md-6">
                                <label>Customer Contact :* </label>
                                <input type="text" className="form-control" name="c_contact"  value={this.state.c_contact} onChange={ this.enterDataHandler }></input>
                            </div>
                            <div className="form-group col-md-6">
                                <label>Customer Secondary Contact : </label>
                                <input type="text" className="form-control" name="c_sec_contact"  value={this.state.c_sec_contact} onChange={ this.enterDataHandler }></input>
                            </div>
                            <div className="form-group col-md-6">
                                <label>Address : </label>
                                <textarea type="text" rows="5" className="form-control" name="address"  value={this.state.address} onChange={ this.enterDataHandler }></textarea>
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
    
}

export default AddCustomerForm;
