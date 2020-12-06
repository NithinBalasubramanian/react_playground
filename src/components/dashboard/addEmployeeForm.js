import React , { useState } from 'react';
import './dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from '../../config/instance';

function AddEmployeeForm() {
    
    const initialState = { 
        e_name : '',
        e_email : '',
        e_contact : '',
        e_sec_contact : '',
        status : 1,
        address : '',
        nameError : '',
        emailError : '',
        contactError : '',
        seccontactError : '',
        disable : false,
    };

    const [ state , setState] = useState({ 
        e_name : '',
        e_email : '',
        e_contact : '',
        e_sec_contact : '',
        status : 1,
        address : '',
        nameError : '',
        emailError : '',
        contactError : '',
        seccontactError : '',
        disable : false,
    });

    const onChangeHandler = (e) => {

        let nowValue = e.target.value;
        let nowName = e.target.name;
        setState(prevstate => { 
            return {...prevstate , [e.target.name] : nowValue }
        });
        verification(nowName , nowValue);
    }

    const verification = (name , value) => {
        if(name === 'e_name'){
            if(value.length < 8){
                setState( prevstate => {
                    return { ...prevstate , nameError : '( Name strength must be above 8 )'}
                });
                setState( prevstate => {
                    return { ...prevstate , disable : true }
                });
            }else{
                setState( prevstate => {
                    return { ...prevstate , nameError : ''}
                });
                setState( prevstate => {
                    return { ...prevstate , disable : false }
                });
            }
        }
        if(name === 'e_contact'){
            if(value.length !== 10){
                setState( prevstate => {
                    return { ...prevstate , contactError : '( Contact Number is invalid )' }
                });
                setState( prevstate => {
                    return { ...prevstate , disable : true }
                });
            }else{
                setState( prevstate => {
                    return { ...prevstate , contactError : ''}
                });
                setState( prevstate => {
                    return { ...prevstate , disable : false }
                });
            }
        }
        if(name === 'e_sec_contact'){
            if(value.length !== 10){
                setState( prevstate => {
                    return { ...prevstate , seccontactError : '( Contact Number is invalid )' }
                });
                setState( prevstate => {
                    return { ...prevstate , disable : true }
                });
            }else{
                setState( prevstate => {
                    return { ...prevstate , seccontactError : ''}
                });
                setState( prevstate => {
                    return { ...prevstate , disable : false }
                });
            }
        }
        if(name === 'e_email'){
            let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(!regEmail.test(value)){
                setState( prevstate => {
                    return { ...prevstate , emailError : '( Invalid Email ID )' }
                });
                setState( prevstate => {
                    return { ...prevstate , disable : true }
                });
            }else{
                setState( prevstate => {
                    return { ...prevstate , emailError : '' }
                });
                setState( prevstate => {
                    return { ...prevstate , disable : false }
                });
            }
        }
    }

    const formSubmitHandler = (e) => {
        e.preventDefault();
        let data = state;
        axios.post("insert/employee",data)
        .then(response => { console.log(response) })
        .catch(error => { console.log(error) })
        setState( initialState );
    }

    return (
        <>
        <div className="formPart row">
            <div className="col-md-12 ">
                <form className="row" onSubmit = { formSubmitHandler }>
                    <div className="form-group col-md-6">
                        <label>Employee Name :* </label><span><small style= {{ color:'red',padding:'opx 10px' }}>{ state.nameError }</small></span>
                        <input type="text" 
                        className={ (state.nameError !== '') ? `form-control is-invalid` : ` form-control` }  
                        value={ state.e_name } 
                        onChange={ onChangeHandler } 
                        name="e_name"></input>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Employee Email :* </label><span><small style= {{ color:'red',padding:'opx 10px' }}>{ state.emailError }</small></span>
                        <input type="email" 
                        className={ (state.emailError !== '') ? `form-control is-invalid` : ` form-control` }  
                        value={ state.e_email } 
                        onChange={ onChangeHandler } 
                        name="e_email"></input>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Employee Contact :* </label><span><small style= {{ color:'red',padding:'opx 10px' }}>{ state.contactError }</small></span>
                        <input type="text" 
                        className={ (state.contactError !== '') ? `form-control is-invalid` : ` form-control` }  
                        value={ state.e_contact } 
                        onChange={ onChangeHandler } 
                        name="e_contact"></input>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Employee Secondary Contact : </label><span><small style= {{ color:'red',padding:'opx 10px' }}>{ state.seccontactError }</small></span>
                        <input type="text" 
                        className={ (state.seccontactError !== '') ? `form-control is-invalid` : ` form-control` }  
                        value={ state.e_sec_contact } 
                        onChange={ onChangeHandler } 
                        name="e_sec_contact"></input>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Address : </label>
                        <textarea type="text" 
                        rows="5" 
                        className="form-control" 
                        name="address"></textarea>
                    </div>
                    <div className="col-md-12">
                        <button type="submit" 
                        className="sideButton submitButton" disabled = { state.disable }>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </>
    )
}

export default AddEmployeeForm;
