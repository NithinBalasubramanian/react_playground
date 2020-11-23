import React from 'react';
import logo from '../../assets/logo512.png';
import './display.css';

function Navbar() {
    return (
        <div className="nav_main">
            <div className="logo">
             <div className="logo_img">
                <img src={logo} width="100%" alt="logo" height="100%" />
             </div>
             <h1>
                 Playground
             </h1>
            </div>
            <div className="nav_list">
                <div className="nav_list_outs">
                 <div className="nav_list_outs_data">
                    <ul>
                        <li><a>HOME</a></li>
                        <li><a>PROJECTS</a></li>
                    </ul>
                 </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;
