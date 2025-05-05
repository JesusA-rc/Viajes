import { Box, CssBaseline, Container } from "@mui/material";
import React from "react";
import { useLocation, Outlet } from 'react-router-dom';
import NavBar from "./NavBar";
import AdminNavBar from "./features/pages/Admin/AdminNavBar";
import SidebarDrawer from "./features/components/SidebarDrawer";




function App() {
  const location = useLocation();
  const menuItems = [
    {
      name: 'Categorías',
      subItems: [
        { name: 'Categorias', path: '/adminCategorias' },
        { name: 'Crear', path: '/adminCrearCategoria' },
        { name: 'Editar', path: '/adminEditarCategoria' },
      ],
    },
    {
      name: 'Destinos',
      subItems: [
        { name: 'Destinos', path: '/adminDestinos' },
        { name: 'Crear', path: '/adminAgregarDestinos' },
        { name: 'Editar', path: '/admindEditarDestino' },
      ],
    },
  ];

  return (
    <React.Fragment>
      <Box sx={{ backgroundColor: '#eeeeee', minHeight: '100vh'}}>
        <CssBaseline />
        {!(location.pathname === '/' || /^\/admin/.test(location.pathname) || location.pathname === '/clientes/register'
          || location.pathname === '/clientes/login') && <NavBar />}
        {(/^\/admin/.test(location.pathname)) && 
        <Box>
            <AdminNavBar/>
            <Box>
              <SidebarDrawer menuItems={menuItems}/>
            </Box>
        </Box>
        }
        <Box>
          <Outlet/>
        </Box>
      </Box>
    </React.Fragment>
  )
}

export default App
