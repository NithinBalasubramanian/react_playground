import React from 'react'
import Navbar from './navbar';
import Medianav from './medianav';
import About from './about';
import Project from './project';
import Tolearn from './tolearn';
import { BrowserRouter , Switch , Route} from 'react-router-dom';

function Initial_combine() {

    return (
        <div>
            <BrowserRouter>
            <Navbar />
            <Medianav />
                <Switch>
                    <Route path='/' exact>
                        <About />
                        <Tolearn />
                    </Route>
                    <Route path='/home' exact>
                        <About />
                        <Tolearn />
                    </Route>
                    <Route path='/project' component={Project}  />
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default Initial_combine;
