import React from 'react'
import Navbar from './navbar';
import Medianav from './medianav';
import About from './about';
import Project from './project';
import Dashboard_main from '../dashboard/dashboard_main';
import Tolearn from './tolearn';
import { BrowserRouter , Switch , Route} from 'react-router-dom';

function Initial_combine() {

    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route path='/' exact>
                        <Navbar />
                        <Medianav />
                        <About />
                        <Tolearn />
                    </Route>
                    <Route path='/home' exact>
                        <Navbar />
                        <Medianav />
                        <About />
                        <Tolearn />
                    </Route>
                    <Route path='/project' >
                        <Navbar />
                        <Medianav />
                        <Project />
                    </Route>
                    <Route path='/dashboard' component={Dashboard_main}  />
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default Initial_combine;
