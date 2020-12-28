import React , { useState , useEffect } from 'react';
import './dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from '../../config/instance';

function ListProductData() {

    const [ datas , setdatas ] = useState([]);

    
    useEffect(() => {
        fetchAll();
    },[])

    const fetchAll = () => {
        axios.get('fetch_data/products')
        .then(res => {
            setdatas(res.data)
        })
        .catch( error => {
            console.log(error);
        })
    }

    const onActionClick = (delId) => {
        if(window.confirm('Are you sure ?')){
            axios.get('del_data/products/'+delId)
            .then(res => {
                fetchAll();
            })
            .catch( error => {
                console.log(error);
            })
        }
    }

    return (
        <>
        <div className="table-responsive tablePart">
           <table className="table table-bordered table-hover table-striped">
            <thead style={{'backgroundColor':'#61DAFB'}} >
                <tr>
                    <th>S.No</th>
                    <th>Product</th>
                    <th>Rate</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {datas.map((itm, k) => { 
                    let id = itm.id;
                    return(
                    <tr>
                        <td>{ k+1 }</td>
                        <td>{ itm.product_name }</td>
                        <td>{ itm.product_rate }</td>
                        <td><button type="button" onClick = {() => { onActionClick(id) }} className="btn btn-danger btn-sm" >Delete</button></td>
                    </tr>
                    )
                })}
            </tbody>
           </table> 
        </div>
        </>
    )
}

export default ListProductData
