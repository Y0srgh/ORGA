// Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './SideB.css';

const SideB = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={toggleSidebar}>×</button>
      <div className="logo-sidebar">
        <p className="logo-name">
          ORGA
        </p>
        <p className="logo-slogan">
          ORGANISATION ET GESTION DES RESSOURCES ASSOCIATIVES
        </p>
        <hr className="logo-divider" />
      </div>
      {((localStorage.role === "Président")||(localStorage.role === "Admin"))&&(<ul className='sidebar-component'>
        {(localStorage.role === "Président") && (<li><Link to="/calendar" className='icons pi pi-calendar'> <p className='sidebar-item'>Calendar </p></Link></li>)}
        {(localStorage.role === "Admin") && (<>
          <li><Link to="/admin-dashboard" className='icons pi pi-warehouse'><p className='sidebar-item'>Admin Dashboard </p></Link></li>
          <li><Link to="/user" className='icons pi pi-users'><p className='sidebar-item'>Users </p></Link></li>
          <li><Link to="/club" className='icons pi pi-database'><p className='sidebar-item'>Clubs </p></Link></li>
        </>)}
        <li><Link to="/profile" className='icons pi pi-user-edit' ><p className='sidebar-item'>Profil</p></Link></li>
        <li><Link to="/log-out" className='icons pi pi-sign-out'><p className='sidebar-item'>Se deconnecter </p></Link></li>
      </ul>)}
    </div>
  );
};

export default SideB;
