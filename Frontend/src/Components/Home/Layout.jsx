// Layout.jsx
import React from 'react';
import Navbar from './Navbar.jsx';
import Sidebar from './Sidebar.jsx';
import './Layout.css'; // Import any layout-specific styles here

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <div className="layout-content">
        <Sidebar />
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
