import { useState } from 'react'
import './App.css'
import Sidebar from './Components/Sidebar'
import Navbar from './Components/Navbar'
import './Components/Navbar.css'
import './Components/Sidebar.css'

import Userprofile from './Components/Userprofile'
import './Components/Userprofile.css'
import ProfileCard from './Components/Profilecard'
import './Components/Profilecard.css'

function App() {
    const photo = "https://static.vecteezy.com/ti/vecteur-libre/p1/6026787-avatar-profil-default-social-media-photo-icon-vector-in-flat-style-vectoriel.jpg";
    const username = "roua timoumi"; 
    const profileImgUrl = "https://static.vecteezy.com/ti/vecteur-libre/p1/6026787-avatar-profil-default-social-media-photo-icon-vector-in-flat-style-vectoriel.jpg"; 

    return (
    <div className="app">
   
   <Sidebar />
    </div>)
}

export default App;
