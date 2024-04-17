import React from 'react'
import Profile from './Profile'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
function Navbar() {
    const profileImgUrl = "https://cdn.loeildelaphotographie.com/wp-content/uploads/2013/02/original_1-facebook-profile-picture-jpg-500x350.jpg"
    
    return ( 
        <div className="navigation">
            
             <div className ="navicons">
             
             <NotificationsNoneIcon className="notifications" fontSize="small"  style={{ color: '#FFFFFF' }} />
             <Profile profileImg={profileImgUrl}  />
             </div>
        </div>
    );
}
export default Navbar;

