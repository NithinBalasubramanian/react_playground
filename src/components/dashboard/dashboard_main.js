import React,{ useState } from 'react';
import logo from '../../assets/logo512.png';
import '../UI/display.css';
import './dashboard.css';
import { Link} from 'react-router-dom';
import Sidebar from './sidebar';
import Maincont from './maincont';

function Dashboard_main() {
    const [ display_status , setdisplay_status ] = useState(true);

    const sidebarStatusHandler = () =>{
        setdisplay_status(!display_status);
    }

    return (
        <>
        <div className="nav_main">
            <div className="logo">
             <div className="logo_img">
                <img src={logo} onClick={sidebarStatusHandler} width="100%" alt="logo" height="100%" />
             </div>
             <h6>
                 Playground Dashboard
             </h6>
            </div>
            <div className="nav_list">
            <div className="nav_list_outs">
                <div className="nav_list_outs_data">
                    <ul>
                        <li><Link to='/home'>HOME</Link></li>
                        <li><Link to='/project'>PROJECTS</Link></li>
                        <li><Link to='/dashboard'>DASHBOARD</Link></li>
                    </ul>
                </div>
            </div>
            </div>
        </div>
        <Sidebar status={display_status} />
        <Maincont />
        </>
    )
}

export default Dashboard_main;
