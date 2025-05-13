import React, {useState} from 'react';
import { AppBar, Toolbar, Typography, Button, Avatar, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useLocation } from 'react-router-dom';

const NavBarCliente = () => {
    const [isHovered, setIsHovered] = useState(false);

    const solidColor = '#0056E1';
    const transparentColor = 'rgba(0, 86, 225, 0.5)';

    const activeColorNav = '#272343';
    const location = useLocation();

    const isActiveColorNav = (path) => {
        return location.pathname === path;
    };

    const navLinks = [
        { text: 'Home', path: '/clientes/home' },
        { text: 'Profile', path: '/clientes/profile' },
        { text: 'Destinos List', path: '/clientes/destinos-list' },
        { text: 'Estadisticas', path: '/clientes/estadisticas' },
        { text: 'Buscar', path: '/clientes/buscar/destinos' },
        { text: 'Forum', path: '/clientes/forum' },
    ];


    return (
        <AppBar position="static"
            sx={{
                backgroundColor: isHovered ? solidColor : transparentColor,
                transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)}
        >
            <Toolbar>

                <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h6" component="div">
                        <img src="/logo.png" alt="Logo" style={{ width: '30px', height: '30px' }} />
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center',  flexGrow: 1 }}>
                    {navLinks.map((link, index) => (
                            <Button
                                key={index}
                                color="inherit"
                                href={link.path}
                                sx={{ color: isActiveColorNav(link.path) ? activeColorNav : 'inherit',
                                    fontWeight:'bold'
                                 }}
                            >
                                {link.text}
                            </Button>
                    ))}
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <SearchIcon />
                    <Avatar alt="User Profile" src="/avatar.jpg" sx={{ ml: 2 }} />
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavBarCliente;