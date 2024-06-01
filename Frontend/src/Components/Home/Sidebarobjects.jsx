import HomeIcon from '@mui/icons-material/Home';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import HistoryIcon from '@mui/icons-material/History';
import PersonIcon from '@mui/icons-material/Person';

export const Sidebarobjects =[
    {title:"Accueil",
    icon: <HomeIcon/>,
link:"/Home" //url du home page 
},
{title:"Réserver",
    icon: <EditCalendarIcon/>,
link:"/reserve" //url du forum de reservation 
},
{title:"Historique",
    icon: <HistoryIcon/>,
link:"/history" //url de l'historique 
},
{title:"Profil",
    icon: <PersonIcon/>,
link:"/profil" //url de profil
}
]