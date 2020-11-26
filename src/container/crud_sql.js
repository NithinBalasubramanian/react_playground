import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/UI/display.css';
import axios from 'axios';

class Crud_sql extends Component {
    constructor(){
        super()
        this.state = {
            name : "",
            contact : "",
            email : "",
            submit_state : false
        }
    }

    changeHandling = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    
    postData = async(e) => {
        e.preventDefault();
        this.setState({submit_state : true});
        const data = {
            name : this.state.name,
            contact : this.state.contact,
            email : this.state.email,
        }
        axios.post("http://localhost/pingifbulk/Api/react_post",data)
        .then(response => { console.log(response) })
        .catch(error => { console.log(error) })
    }

    render() {
        const { name , contact , email } = this.state;
        return(
            <div className="container pt-4 pb-4">
                <div className="row">
                    <div className="col-md-6">
                        <h1>Customer Form</h1>
                        <form >
                        <div className="form-group">
                            <label>Name :</label>
                            <input type="text" className="form-control" 
                            name="name" 
                            value={name}
                            onKeyUp={this.changeHandling}
                            placeholder="Enter name" required/>
                        </div>
                        <div className="form-group">
                            <label>Contact :</label>
                            <input type="text" className="form-control" 
                            name="contact" 
                            maxLength="10"
                            onKeyUp={this.changeHandling}
                            placeholder="Enter contact" required/>
                        </div>
                        <div className="form-group">
                            <label>Email :</label>
                            <input type="email"
                             className="form-control" 
                             name="email"
                            onKeyUp={this.changeHandling}
                            placeholder="Enter email" required/>
                        </div>
                        <button type="submit" className="btn btn-sm btn-info" disabled={this.state.submit_state} 
                        onClick={this.postData} >submit</button>
                        </form>
                        <h1>{this.state.name}</h1>
                        <h1>{this.state.contact}</h1>
                        <h1>{this.state.email}</h1>
                    </div>
                </div>
            </div>
        )
    }

}

export default Crud_sql;