import React , { Component } from 'react';
import './dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const initialState = {
    c_name : '',
    c_email : '',
    c_contact : '',
    c_sec_contact : '',
    address : '',
    nameError : '',
    emailError : '',
    contactError : '',
    seccontactError : '',
    disable : false,
};

class AddCustomerForm extends Component {
    constructor(){
        super()
        this.state = {
            c_name : '',
            c_email : '',
            c_contact : '',
            c_sec_contact : '',
            address : '',
            nameError : '',
            emailError : '',
            contactError : '',
            seccontactError : '',
            disable : false,
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

    verification = (name , value) => {
        if(name === 'c_name'){
            if(value.length < 8){
                this.setState({nameError : '( Name strength must be above 8 ) '});
                this.setState({ disable : true });
            }else{
                this.setState({nameError : '' });
                this.setState({ disable : false });
            }
        }
        if(name === 'c_contact'){
            if(value.length !== 10){
                this.setState({ contactError : '( Contact Number is invalid ) ' });
                this.setState({ disable : true });
            }else{
                this.setState({contactError : '' });
                this.setState({ disable : false });
            }
        }
        if(name === 'c_sec_contact'){
            if(value.length !== 10){
                this.setState({ seccontactError : '( Contact Number is invalid ) ' });
                this.setState({ disable : true });
            }else{
                this.setState({seccontactError : '' });
                this.setState({ disable : false });
            }
        }
        if(name === 'c_email'){
            let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(!regEmail.test(value)){
                this.setState({ emailError : '( Invalid Email ID )' });
                this.setState({ disable : true });
            }else{
                this.setState({ emailError : '' });
                this.setState({ disable : false });
            }
        }
    }

    enterDataHandler = (e) => {
        let now_name = e.target.name;
        let now_value = e.target.value;
        this.verification(now_name , now_value);
        this.setState({ [now_name] : now_value });
    }

    render() {
        return (
            <>
                <div className="formPart row">
                    <div className="col-md-12 ">
                        <form className="row" onSubmit={ this.formSubmitHandler }>
                            <div className="form-group col-md-6">
                                <label>Customer Name : * </label><span><small style= {{ color:'red',padding:'opx 10px' }}>{ this.state.nameError }</small></span>
                                <input type="text" 
                                className={ (this.state.nameError !== '') ? `form-control is-invalid` : ` form-control` }  
                                name="c_name" 
                                value={this.state.c_name} 
                                onChange={ this.enterDataHandler } 
                                required></input>
                            </div>
                            <div className="form-group col-md-6">
                                <label>Customer Email : * </label><span><small style= {{ color:'red',padding:'opx 10px' }}>{ this.state.emailError }</small></span>
                                <input type="email" 
                                className={ (this.state.emailError !== '') ? `form-control is-invalid` : ` form-control` }  
                                name="c_email"  
                                value={this.state.c_email} 
                                onChange={ this.enterDataHandler }></input>
                            </div>
                            <div className="form-group col-md-6">
                                <label>Customer Contact : * </label><span><small style= {{ color:'red',padding:'opx 10px' }}>{ this.state.contactError }</small></span>
                                <input type="text" 
                                className={ (this.state.contactError !== '') ? `form-control is-invalid` : ` form-control` }  
                                name="c_contact"  
                                value={this.state.c_contact} 
                                onChange={ this.enterDataHandler }></input>
                            </div>
                            <div className="form-group col-md-6">
                                <label>Customer Secondary Contact : </label><span><small style= {{ color:'red',padding:'opx 10px' }}>{ this.state.seccontactError }</small></span>
                                <input type="text" 
                                className={ (this.state.seccontactError !== '') ? `form-control is-invalid` : ` form-control` }  
                                name="c_sec_contact"  
                                value={this.state.c_sec_contact} 
                                onChange={ this.enterDataHandler }></input>
                            </div>
                            <div className="form-group col-md-6">
                                <label>Address : </label>
                                <textarea type="text" 
                                className = "form-control"
                                rows="5"   
                                name="address"  
                                value={this.state.address} 
                                onChange={ this.enterDataHandler }></textarea>
                            </div>
                            <div className="col-md-12">
                                <button type="submit" 
                                className = "sideButton submitButton"
                                disabled={ this.state.disable }>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </>
            )
        }
    }

export default AddCustomerForm;
