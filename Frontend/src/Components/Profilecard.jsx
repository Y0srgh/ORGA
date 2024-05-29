import React from 'react';
import { Profileobjects } from "./Profileobjects";  // Assurez-vous que le chemin est correct

function ProfileCard({ username, profileImg }) {
    return (
        <div className="user-profile-card">
            <div className="user-profile-info">
                <div className="cl">
                <img src={profileImg} alt="Profile" className="user-profile-img" />
                <p className="user-username">{username}</p>
                
                
              </div>
                <div className="user-bar">
                    <ul className='user-profilelist'>
                        {Profileobjects.map((val, key) => {  
                            return (
                                <li className='user-row'
                                    id={window.location.pathname === val.link ? "user-active" : ""}
                                    key={key}
                                    onClick={() => window.location.pathname = val.link}
                                >
                                    <div className="user-icon">{val.icon}</div>
                                    <div className="user-title">{val.title}</div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ProfileCard;
