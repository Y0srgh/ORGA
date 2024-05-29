import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import FeedbackIcon from '@mui/icons-material/Feedback';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';

export const Profileobjects = [
    {
        title: "Paramètres",
        icon: <SettingsIcon />,
        link: "/Settings"
    },
    {
        title: "Feedback",
        icon: <FeedbackIcon />,
        link: "Donner un feedback"
    },
    {
        title: "Se déconnecter",
        icon: <LogoutIcon />,
        link: "Déconnexion"
    }
];
