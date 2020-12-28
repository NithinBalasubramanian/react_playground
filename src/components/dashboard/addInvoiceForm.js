import React , { useEffect , useState } from 'react';
import './dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from '../../config/instance';

function AddInvoiceForm() {

    let [ customerList , setCustomerList ] = useState([]);

    useEffect(() => {
        fetchAll();
    })

    const fetchAll = () => {
        axios.get('fetch_data/customer')
        .then(res => {
            setCustomerList(res.data)
        })
        .catch( error => {
            console.log(error);
        })
    }

    return (
        <>
            <div className="row mt-4">
                <div className="form-group col-md-6">
                    <label>Invoice Number : </label>
                    <input className="form-control" type="text"></input>
                </div>
                <div className="form-group col-md-6">
                    <label>Customer Name : </label>
                    <select className="form-control">
                    { customerList.map((itm,k) => {
                        return(
                            <option value={itm.id} key={k}>{itm.c_name}</option>
                            )
                    })}
                    </select>
                </div>
            </div>
        </>
    )
}

export default AddInvoiceForm
