import React from 'react';
import logo from '../../assets/logo512.png';
import './display.css';
import { NavLink } from 'react-router-dom';

function Navbar() {
    return (
        <div className="nav_main">
            <div className="logo">
             <div className="logo_img">
                <img src={logo} width="100%" alt="logo" height="100%" />
             </div>
             <h4>
                 Playground
             </h4>
            </div>
            <div className="nav_list">
                <div className="nav_list_outs">
                 <div className="nav_list_outs_data">
                    <ul>
                        <li><NavLink to='/' exact activeClassName="mainNavActive">HOME</NavLink></li>
                        <li><NavLink to='/project' activeClassName="mainNavActive">PROJECTS</NavLink></li>
                        <li><NavLink to='/dashboard' activeClassName="mainNavActive">DASHBOARD</NavLink></li>
                    </ul>
                 </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;
