import React , { useState , useEffect } from 'react';
import './dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from '../../config/instance';

function ListCustomerData() {

    const [ datas , setdatas ] = useState([]);

    useEffect(() => {
        axios.get('fetch_data/employee')
            .then(res => {
                setdatas(res.data)
            })
            .catch( error => {
                console.log(error);
            })
    },[])

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
                    return ( 
                    <tr>
                        <td>{ k+1 }</td>
                        <td>{ itm.e_name }</td>
                        <td>{ itm.e_contact }</td>
                        <td>{ itm.e_email }</td>
                        <td>{ itm.e_sec_contact }</td>
                        <td>{ itm.address }</td>
                        <td></td>
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
