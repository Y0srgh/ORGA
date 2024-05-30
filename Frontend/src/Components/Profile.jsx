import React from 'react';

function Profile({ profileImg, onClick }) {
    return (
        <img src={profileImg} alt="Profil" className="photo-profil" onClick={onClick} />
    );
}


export default Profile;
