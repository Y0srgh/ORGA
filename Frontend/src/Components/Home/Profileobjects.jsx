import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';

export const Profileobjects = [
    {
        title: "Paramètres",
        icon: <SettingsIcon />,
        link: "/profile"
    },
    {
        title: "Se déconnecter",
        icon: <LogoutIcon />,
        link: "Déconnexion"// à relpacer par l'url de la déconnexion
    }
];