import React, {useState} from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { AppBar, Toolbar, Typography, Button, Avatar, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useLocation } from 'react-router-dom';
import { useUsuarios } from '../../../../lib/hooks/useUsuarios';

const NavBarCliente = () => {
    const [isHovered, setIsHovered] = useState(false);
    const { logoutUser } = useUsuarios();

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

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        logoutUser.mutate();
    };

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
                    <Avatar
                        alt="User Profile"
                        src="/avatar.jpg"
                        sx={{ ml: 2, cursor: 'pointer' }}
                        onClick={handleClick}
                    />
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                        <MenuItem onClick={handleClose} color="error">
                            Cerrar sesión
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavBarCliente;