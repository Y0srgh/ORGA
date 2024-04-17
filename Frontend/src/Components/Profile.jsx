import React from 'react';

function Profile({ profileImg }) {
    return (
        <img src={profileImg} alt="Profil" className="photo-profil" />
    );
}

export default Profile;
