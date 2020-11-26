import React from 'react';
import './dashboard.css';

function Sidebar(props) {

    return(
        <div className={ (props.status) ? 'sidebar_cont active_side' : 'sidebar_cont'}>
        </div>
    )
}

export default Sidebar;
