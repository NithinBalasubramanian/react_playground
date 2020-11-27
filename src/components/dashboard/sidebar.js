import React from 'react';
import './dashboard.css';
import { NavLink } from 'react-router-dom';

function Sidebar(props) {

    return(
        <div className={ (props.status) ? 'sidebar_cont active_side' : 'sidebar_cont'}>
            <div className="sidebarList">
                <NavLink to='/dashboard' exact className="navCont" activeClassName="navActive">
                    <div className="navIcon">
                        h
                    </div>
                    <div className="navMenu">
                        Dashboard
                    </div>
                </NavLink>
                <NavLink to='/dashboard/Customer'  className="navCont" activeClassName="navActive">
                    <div className="navIcon">
                        h
                    </div>
                    <div className="navMenu">
                        Customer
                    </div>
                </NavLink>
                <NavLink to='/dashboard/Employee' className="navCont" activeClassName="navActive">
                    <div className="navIcon">
                        h
                    </div>
                    <div className="navMenu">
                        Employee
                    </div>
                </NavLink>
                <NavLink to='/dashboard/Supplier' className="navCont" activeClassName="navActive">
                    <div className="navIcon">
                        h
                    </div>
                    <div className="navMenu">
                        Supplier
                    </div>
                </NavLink>
            </div>
        </div>
    )
}

export default Sidebar;
