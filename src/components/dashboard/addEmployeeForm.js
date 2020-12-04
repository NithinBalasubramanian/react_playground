import React , { useState } from 'react';
import './dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function AddEmployeeForm() {
    
    const initialState = { 
        e_name : '',
        e_email : '',
        e_contact : '',
        e_sec_contact : '',
        address : '',
        nameError : '',
        emailError : '',
        contactError : '',
        seccontactError : '',
        disable : false,
    };

    const [ eData , seteData] = useState({ 
        e_name : '',
        e_email : '',
        e_contact : '',
        e_sec_contact : '',
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
        seteData({ [e.target.name] : nowValue });
        verification(nowName , nowValue);
    }

    const verification = (name , value) => {
        if(name === 'e_name'){
            if(value.length < 8){
                seteData({ nameError : '( Name strength must be above 8 )'});
                seteData({ disable : true });
            }else{
                seteData({nameError : '' });
                seteData({ disable : false });
            }
        }
        if(name === 'e_contact'){
            if(value.length !== 10){
                seteData({ contactError : '( Contact Number is invalid ) ' });
                seteData({ disable : true });
            }else{
                seteData({contactError : '' });
                seteData({ disable : false });
            }
        }
        if(name === 'e_sec_contact'){
            if(value.length !== 10){
                seteData({ seccontactError : '( Contact Number is invalid ) ' });
                seteData({ disable : true });
            }else{
                seteData({seccontactError : '' });
                seteData({ disable : false });
            }
        }
    }

    const formSubmitHandler = (e) => {
        e.preventDefault();
        // let data = {
        //     id : 12
        // }
        // axios.post("http://localhost/react_play/Api/insert/employee",data)
        // .then(response => { console.log(response) })
        // .catch(error => { console.log(error) })
        seteData( initialState );
    }

    return (
        <>
        <div className="formPart row">
            <div className="col-md-12 ">
                <form className="row" onSubmit = { formSubmitHandler }>
                    <div className="form-group col-md-6">
                        <label>Employee Name :* </label><span><small style= {{ color:'red',padding:'opx 10px' }}>{ eData.nameError }</small></span>
                        <input type="text" 
                        className={ (eData.nameError !== '') ? `form-control is-invalid` : ` form-control` }  
                        value={ eData.e_name } 
                        onChange={ onChangeHandler } 
                        name="e_name"></input>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Employee Email :* </label><span><small style= {{ color:'red',padding:'opx 10px' }}>{ eData.emailError }</small></span>
                        <input type="email" 
                        className={ (eData.emailError !== '') ? `form-control is-invalid` : ` form-control` }  
                        value={ eData.e_email } 
                        onChange={ onChangeHandler } 
                        name="e_email"></input>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Employee Contact :* </label><span><small style= {{ color:'red',padding:'opx 10px' }}>{ eData.contactError }</small></span>
                        <input type="text" 
                        className={ (eData.contactError !== '') ? `form-control is-invalid` : ` form-control` }  
                        value={ eData.e_contact } 
                        onChange={ onChangeHandler } 
                        name="e_contact"></input>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Employee Secondary Contact : </label><span><small style= {{ color:'red',padding:'opx 10px' }}>{ eData.secContactError }</small></span>
                        <input type="text" 
                        className={ (eData.secContactError !== '') ? `form-control is-invalid` : ` form-control` }  
                        name="e_sec_cont"></input>
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
                        className="sideButton submitButton" disabled = { eData.disable }>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </>
    )
}

export default AddEmployeeForm;
