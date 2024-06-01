import HomeIcon from '@mui/icons-material/Home';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import PaddingIcon from '@mui/icons-material/Padding';
export const Sidebarobjects =[
    {title:"Accueil",
    icon: <HomeIcon/>,
link:"/Home" //url du home page 
},
{title:"Réservation",
    icon: <EditCalendarIcon/>,
link:"/reserve" //url du forum de reservation 
},
{title:"Profil",
    icon: <PersonIcon/>,
link:"/profil" //url de profil
},{title:"gestion des utilisateurs",
icon: < GroupIcon/>
,
link:"/users" //url de deconnexion 
},
{title:"gestion des Clubs",
icon: < PaddingIcon/>
,
link:"/clubs" //url de deconnexion 
}
]