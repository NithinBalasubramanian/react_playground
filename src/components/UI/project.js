import React from 'react';
import './display.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Todo from '../../container/todo';
import Crudsql from '../../container/crud_sql';
import Mailer from '../../container/mailer';

import { BrowserRouter as Router , Link , Switch , Route} from 'react-router-dom';

function Project() {
    return (
        <div className="about_cont">
            <div className="container mt-5 mb-5">
            <Router>
                <div className="row">
                    <div className="col-md-8">
                        <h1>Projects </h1>
                        <ul>
                            <li><Link to="/project/project_todo">Todo Funtionality</Link></li>
                            <li><Link to="/project/project_crud">CRUD Funtionality mysql</Link></li>
                            <li><Link to="/project/project_mailer">Mailer</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="project_disp">
                <Switch>
                    <Route path="/project/project_todo">
                        <Todo />
                    </Route>
                    <Route path="/project/project_crud">
                        <Crudsql />
                    </Route>
                    <Route path="/project/project_mailer">
                        <Mailer />
                    </Route>
                </Switch>
                </div>
            </Router>
            </div>
        </div>
    )
}

export default Project;
