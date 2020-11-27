import React,{ useState } from 'react';
import logo from '../../assets/logo512.png';
import '../UI/display.css';
import './dashboard.css';
import { NavLink} from 'react-router-dom';
import Sidebar from './sidebar';
import Maincont from './maincont';
import { BrowserRouter as Router} from 'react-router-dom';
import { BiMenuAltLeft } from 'react-icons/bi';

function Dashboard_main() {
    const [ display_status , setdisplay_status ] = useState(true);

    const sidebarStatusHandler = () =>{
        setdisplay_status(!display_status);
    }

    return (
        <>
        <div className="nav_main">
            <div className="logo">
               <BiMenuAltLeft  onClick={sidebarStatusHandler} size="50px" color="#fff" style={{margin:"20px"}}/>
             <div className="logo_img">
                <img src={logo} width="100%" alt="logo" height="100%" />
             </div>
             <h4>
                 Dashboard
             </h4>
            </div>
            <div className="nav_list">
            <div className="nav_list_outs">
                <div className="nav_list_outs_data">
                    <ul>
                        <li><NavLink to='/home' activeClassName="mainNavActive">HOME</NavLink></li>
                        <li><NavLink to='/project' activeClassName="mainNavActive">PROJECTS</NavLink></li>
                        <li><NavLink to='/dashboard' activeClassName="mainNavActive">DASHBOARD</NavLink></li>
                    </ul>
                </div>
            </div>
            </div>
        </div>
        <div className="flexPart">
        <Router>
            <Sidebar status={display_status} />
            <Maincont />
        </Router>
        </div>
        </>
    )
}

export default Dashboard_main;
