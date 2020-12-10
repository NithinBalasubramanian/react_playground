import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

 class Todo extends Component {
    constructor(){
        super()
    this.state = { 
        todo : ['nithin','do it'],
        new_todo : "",
    }
    }

    getData =(event) =>{
        let new_data = event.target.value;
        this.setState({
            new_todo : new_data,
        })
    }

    addTodo = (e) => {
        e.preventDefault();
        let new_data = this.state.new_todo;
        let todo_cont = this.state.todo;
        todo_cont.push(new_data);
        this.setState({ todo : todo_cont });
        this.setState({
            new_todo : ''
        });
    }

    remove_this = (id) => {
        let data = this.state.todo;
        data.splice(id,1);
        this.setState({
            todo : data
        })
    }

    
    render() {
        return (
            <div className="container pt-4 pb-4">
            <form className="row">
                <input type="text" className="form-control col-md-6" onChange={ this.getData } value={this.state.new_todo} placeholder="Enter TODO Contemt"/>
                <button className="btn btn-sm btn-success col-md-6" onClick ={ this.addTodo }>Add TODO</button>
            </form>
            <h1>{this.state.new_todo}</h1>
            <table className="table table-bordered mt-5 mb-5">
            <thead>
                <tr>
                    <th>s.No</th>
                    <th>TODO</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {this.state.todo.map((itm,k) => {
                    return (
                        <tr key={k}>
                            <td>{k+1}</td>
                            <td key={k}>{itm}</td>
                            <td>
                                <button className="btn btn-sm btn-danger" onClick={ () => { this.remove_this(k) } } >Delete</button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
            </table>
            </div>
        )
    }
}

export default Todo
