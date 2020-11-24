import React,{Component} from 'react';
import './display.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from '../../config/instance';

class Tolearn extends Component {
    constructor(){
        super()
        this.state = {
            count : null,
            study_now : "",
            study_todo : [],
        }
    }

    componentDidMount = () => {
        axios.get('/study_todo/studypath.json')
            .then(response =>{
                let clonedstate = this.state.study_todo;
                clonedstate.push(response.data);
                this.setState({study_todo : clonedstate});
            })
            .catch(error => {
                console.log(error);
            })
    }

    onchangeHandler = (e) => {
        let study_now_data =  e.target.value;
        this.setState({study_now : study_now_data});
    }

    submitHandler = (e) => {
        e.preventDefault();
        let state_save = this.state;
        let study_todo_now = [...state_save.study_todo];
        study_todo_now.push(state_save.study_now);
        this.setState({study_todo : study_todo_now ,study_now : ''});
        console.log(this.state.study_todo);
    }
    
    render(){
        const study_todo = this.state.study_todo;
        console.log(study_todo);
    return (
        <div className="tolearn_cont">
            <div className="container mt-5 mb-5">
                <div className="row">
                    <div className="col-md-8">
                        <h2>Study Path</h2>
                        <form onSubmit={this.submitHandler}>
                        <div className="form-group">
                            <label>Add step</label>
                            <input type="text" className="form-control" onKeyUp={this.onchangeHandler} placeholder={this.state.study_now} />
                            <button type="submit" className="btn btn-sm btn-success mt-2" >Add</button>
                        </div>
                        </form>
                        {study_todo.map((todo,k)=> {
                            return (
                                <div key={k}>{todo}</div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
    }
}

export default Tolearn;
