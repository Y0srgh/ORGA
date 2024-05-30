// Navbar.jsx

import Profile from './Profile'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ProfileCard from './Profilecard';
import React, { useState } from 'react';

function Navbar() {
    const profileImgUrl = "https://cdn.loeildelaphotographie.com/wp-content/uploads/2013/02/original_1-facebook-profile-picture-jpg-500x350.jpg";
    const [isProfileCardOpen, setProfileCardOpen] = useState(false);

    const toggleProfileCard = () => {
        setProfileCardOpen(!isProfileCardOpen);
    };

    return (
        <div className="navigation">
            <div className="navicons">
                <NotificationsNoneIcon className="notifications" fontSize="small" style={{ color: '#FFFFFF' }} />
                <Profile profileImg={profileImgUrl} onClick={toggleProfileCard} />
            </div>
            {isProfileCardOpen && <ProfileCard username="Username" profileImg={profileImgUrl} />}
        </div>
    );
}

export default Navbar;
