import React , { useEffect , useState } from 'react';
import './dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from '../../config/instance';

function AddInvoiceForm() {

    let [ customerList , setCustomerList ] = useState([]);

    let [ productList ,setProductList ] = useState([]);

    useEffect(() => {
        fetchAll();
    },[])

    const fetchAll = () => {
        axios.get('fetch_data/customer')
        .then(res => {
            setCustomerList(res.data)
        })
        .catch( error => {
            console.log(error);
        })
        axios.get('fetch_data/products')
        .then(res => {
            setProductList(res.data)
        })
        .catch( error => {
            console.log(error);
        })
    }

    const productChangeHandler = (e) => {
        let productId = e.target.value;

    }

    let [ invoice , setInvoice ] = useState("RPG - 001");

    return (
        <>
            <div className="row mt-4">
                <div className="form-group col-md-6">
                    <label>Invoice Number : </label>
                    <input className="form-control" type="text" value={invoice}></input>
                </div>
                <div className="form-group col-md-6">
                    <label>Customer Name : </label>
                    <select className="form-control">
                        <option>Select Customer</option>
                    { customerList.map((itm,k) => {
                        return(
                            <option value={itm.id} key={k}>{itm.c_name}</option>
                            )
                    })}
                    </select>
                </div>
                <div className="col-md-12 table-responsive">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Product</th>
                                <th>Rate</th>
                                <th>Quantity</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>
                                    <select class="form-control" onChange={ productChangeHandler } >
                                        <option>Select Product</option>
                                        {productList.map((itm,k) => {
                                            return(
                                                <option value={itm.id} key={k}>{itm.product_name}</option>
                                            )
                                        })}
                                    </select>
                                </td>
                                <td>
                                    <input type="number" className="form-control"></input>
                                </td>
                                <td>
                                    <input type="number" className="form-control"></input>
                                </td>
                                <td>
                                    <input type="number" className="form-control"></input>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default AddInvoiceForm
