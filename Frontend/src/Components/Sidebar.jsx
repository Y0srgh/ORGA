import React from 'react';
import { Sidebarobjects } from "./Sidebarobjects";

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sitename ">ORGA</div>
            <div className="completename">ORGANISATION ET GESTION DES RESSOURCES ASSOCIATIVES </div>
            <ul className='sidebarlist'>
                {Sidebarobjects.map((val, key) => {
                    return (
                        <li
                         className ='row' 
                         id={window.location.pathname == val.link ? "active" : ""}

                        key={key} onClick={() => window.location.pathname = val.link}>
                            <div id='icon'>{val.icon}</div>
                            <div id='title'>{val.title}</div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Sidebar;
