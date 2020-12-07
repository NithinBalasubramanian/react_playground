import React , { useState } from 'react';
import './dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from '../../config/instance';

function AddProductForm() {

    const initialState = {
        product_name : '',
        status : 1,
        categoryError : '',
        productError : '',
        disable : false,
    };

    const [ state , setState] = useState({ 
        product_name : '',
        status : 1,
        categoryError : '',
        productError : '',
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
        if(name === 'product_name'){
            if(value.length < 4){
                setState( prevstate => {
                    return { ...prevstate , productError : '( Name strength must be above 8 )'}
                });
            }else{
                setState( prevstate => {
                    return { ...prevstate , productError : ''}
                });
            }
        }
    }

    const formSubmitHandler = (e) => {
        e.preventDefault();
        let data = state;
        axios.post("insert/products",data)
        .then(response => { console.log(response) })
        .catch(error => { console.log(error) })
        setState( initialState );
    }

    return (
        <>
            <div className="formPart row">
                <div className="col-md-12 ">
                    <form className="row" onSubmit={ formSubmitHandler }>
                        <div className="form-group col-md-6">
                            <label>Product Name :* </label><span><small style= {{ color:'red',padding:'opx 10px' }}>{ state.productError }</small></span>
                            <input type="text" 
                            className={ (state.productError !== '') ? `form-control is-invalid` : ` form-control` }  
                            value={ state.product_name } 
                            onChange={ onChangeHandler } 
                             name="product_name"></input>
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

export default AddProductForm
