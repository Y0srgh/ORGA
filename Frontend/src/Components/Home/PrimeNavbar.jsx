import React from 'react';
import { Menubar } from 'primereact/menubar';
import { Avatar } from 'primereact/avatar';
import "./PrimeNavbar.css";
import { Link } from 'react-router-dom';

export default function TemplateDemo() {
    const items = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            url: '/home'
        },
    ];

    const start = <h1 className='logo ml-20 mr-10'>ORGA</h1>;
    const end = (
        <div className="flex align-items-center gap-2 pr-10 avatar-navbar">
            <Avatar image={localStorage.profilePicture&&`http://localhost:5500/${localStorage.profilePicture}`||"https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/1200px-Unknown_person.jpg"} size='large' shape="circle"/>
        </div>
    );

    return (
        <div className="card3">
            <div className="menubar-fixed">
                <Menubar 
                    model={items.map(item => ({
                        ...item, 
                        command: () => { window.location.href = item.url; }
                    }))} 
                    start={start} 
                    end={end} 
                />
            </div>
        </div>
    );
}
