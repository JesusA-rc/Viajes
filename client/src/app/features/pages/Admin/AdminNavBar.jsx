import  React, {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Menu, MenuItem, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import AdbIcon from '@mui/icons-material/Adb';
import TypographyNavBar from '../../components/TypographyNavBar'
import { Link } from 'react-router-dom';

const AdminNavBar = () => {

  const [anchorElNav, setAnchorElNav] = useState(null);


  const navLinks = [
      { text: 'Ver', path: '/adminDestinos/ver' },
      { text: 'Crear', path: '/adminDestinos/crear' },
      { text: 'Editar', path: '/adminDestinos/editar' },
      { text: 'Eliminar', path: '/adminDestinos/eliminar' }
  ];  

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  return (
    <AppBar position="static">
    <Container maxWidth="xl">
      <Toolbar disableGutters>
        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
        <TypographyNavBar header={'Admin'}/>

        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
          >
            <MenuIcon />
          </IconButton>

          <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {navLinks.map((link) => (
                <MenuItem 
                  key={link.text} 
                  onClick={handleCloseNavMenu}
                  component={Link}
                  to={link.path}
                >
                  <Typography textAlign="center">{link.text}</Typography>
                </MenuItem>
              ))}
            </Menu>
        </Box>
        <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
        <Typography
          variant="h5"
          noWrap
          component="a"
          href="#app-bar-with-responsive-menu"
          sx={{
            mr: 2,
            display: { xs: 'flex', md: 'none' },
            flexGrow: 1,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          LOGO
        </Typography>

        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 4 }}>
          {navLinks.map((link) => (
            <Button
              key={link.text}
              component={Link}
              to={link.path}
              sx={{ 
                my: 2, 
                color: 'white', 
                display: 'block',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              {link.text}
            </Button>
          ))}
        </Box>

      </Toolbar>
    </Container>
  </AppBar>
  )
}

export default AdminNavBar