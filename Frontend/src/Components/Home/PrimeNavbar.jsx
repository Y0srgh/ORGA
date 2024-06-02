import React, { useEffect } from 'react';
import { Menubar } from 'primereact/menubar';
import { Avatar } from 'primereact/avatar';
import "./PrimeNavbar.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function TemplateDemo() {

    const id = localStorage.userId;
    const navigate = useNavigate();
//1717290803544_yosrg.jpeg
    useEffect(() => {
        axios
            .get(`http://localhost:5500/users/${id}`)
            .then((resp) => {
                console.log(resp.data);
                if (resp.data.profilePicture) {
                    localStorage.setItem("profilePicture", resp.data.profilePicture)
                }else {
                    setProfilePicture("")
                    localStorage.profilePicture="";
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

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
            <Link to={"/profile"}>
                <Avatar image={localStorage.profilePicture && `http://localhost:5500/${localStorage.profilePicture}` || "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/1200px-Unknown_person.jpg"} size='large' shape="circle" />
            </Link>
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
