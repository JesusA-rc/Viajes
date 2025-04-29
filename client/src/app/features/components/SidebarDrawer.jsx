import React from 'react';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemText, Typography, IconButton, Collapse } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import ExpandLess from '@mui/icons-material/ExpandLess'; // Ícono para colapsar
import ExpandMore from '@mui/icons-material/ExpandMore'; // Ícono para expandir

const SidebarDrawer = ({ menuItems }) => {
  const [open, setOpen] = React.useState(false); // Estado para controlar el Drawer
  const [expanded, setExpanded] = React.useState(null); // Estado para controlar qué menú está expandido
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setOpen(!open); // Abrir/cerrar el Drawer
  };

  const handleMenuClick = (path) => {
    navigate(path);
    setOpen(false); // Cerrar el Drawer después de navegar
  };

  const handleExpand = (name) => {
    setExpanded(expanded === name ? null : name); // Alternar entre expandir y colapsar
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Botón para abrir/cerrar el menú */}
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ mr: 2 }}
      >
        <MenuIcon />
        Menu
      </IconButton>

      {/* Menú lateral */}
      <Drawer
        anchor="left"
        open={open}
        onClose={handleDrawerToggle}
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
          },
        }}
      >
        <Box
          sx={{
            width: 240,
            paddingTop: 2,
            backgroundColor: '#f5f5f5',
          }}
        >
          <Typography variant="h6" noWrap sx={{ px: 2 }}>
            Menú
          </Typography>

          {/* Lista de opciones del menú */}
          <List>
            {menuItems.map((item) => (
              <React.Fragment key={item.name}>
                {/* Opción principal */}
                <ListItemButton onClick={() => handleExpand(item.name)}>
                  <ListItemText primary={item.name} />
                  {expanded === item.name ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>

                {/* Submenú */}
                <Collapse in={expanded === item.name} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.subItems.map((subItem) => (
                      <ListItemButton
                        key={subItem.name}
                        sx={{ pl: 4 }} // Añadir sangría para los submenús
                        onClick={() => handleMenuClick(subItem.path)}
                      >
                        <ListItemText primary={subItem.name} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </React.Fragment>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default SidebarDrawer;