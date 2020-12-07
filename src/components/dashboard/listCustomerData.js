import React , { useState , useEffect } from 'react';
import './dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from '../../config/instance';

function ListCustomerData() {

    const [ datas , setdatas ] = useState([]);

    useEffect(() => {
        fetchAll();
    },[])

    const fetchAll = () => {
        axios.get('fetch_data/customer')
        .then(res => {
            setdatas(res.data)
        })
        .catch( error => {
            console.log(error);
        })
    }

    const onActionClick = (delId) => {
        if(window.confirm('Are you sure ?')){
            axios.get('del_data/customer/'+delId)
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
                    <th>Name</th>
                    <th>Customer</th>
                    <th>Email</th>
                    <th>Secondary</th>
                    <th>Address</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                { datas.map((itm,k) => {
                    let id = itm.id;
                    return ( 
                    <tr>
                        <td>{ k+1 }</td>
                        <td>{ itm.c_name }</td>
                        <td>{ itm.c_contact }</td>
                        <td>{ itm.c_email }</td>
                        <td>{ itm.c_sec_contact }</td>
                        <td>{ itm.address }</td>
                        <td><button type="button" onClick = {() => { onActionClick(id) }} className="btn btn-danger btn-sm" key={k}>Delete</button></td>
                    </tr>
                    )
                }) }
            </tbody>
           </table> 
        </div>
        </>
    )
}

export default ListCustomerData
