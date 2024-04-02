import HomeIcon from '@mui/icons-material/Home';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import HistoryIcon from '@mui/icons-material/History';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
export const Sidebarobjects =[
    {title:"Accueil",
    icon: <HomeIcon/>,
link:"/Home"
},
{title:"Réserver",
    icon: <EditCalendarIcon/>,
link:"/reserve"
},
{title:"Historique",
    icon: <HistoryIcon/>,
link:"/history"
},
{title:"Profil",
    icon: <PersonIcon/>,
link:"/profil"
},{title:"Se déconnecter",
icon: < LogoutIcon/>
,
link:"/disconnect"
}
]