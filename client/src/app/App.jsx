import { Box, CssBaseline, LinearProgress } from "@mui/material";
import React, { Suspense } from "react";
import { useLocation, Outlet, useNavigation } from 'react-router-dom';
import NavBar from "./NavBar";
import AdminNavBar from "./features/pages/Admin/AdminNavBar";
import SidebarDrawer from "./features/components/SidebarDrawer";
import { FiltrosProvider} from "./features/contexts/FiltrosContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() 
{
  const location = useLocation();
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  const menuItems = [
    {
      name: 'Categorías',
      subItems: [
        { name: 'Editar', path: '/adminEditarCategoria' },
      ],
    },
    {
      name: 'Destinos',
      subItems: [
        { name: 'Editar', path: '/admindEditarDestino' },
      ],
    },
  ];

  return (
    <React.Fragment>
        <FiltrosProvider>
          <Box sx={{ backgroundColor: '#eeeeee', minHeight: '100vh', position: 'relative' }}>
            <CssBaseline />
            {isLoading && (
              <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999 }}>
                <LinearProgress color="primary" sx={{ height: 4 }} />
              </Box>
            )}

            {!(location.pathname === '/' || /^\/admin/.test(location.pathname) || location.pathname.startsWith("/clientes")) && <NavBar />}
            {(/^\/admin/.test(location.pathname)) && 
            <Box>
                <AdminNavBar/>
                <Box>
                  <SidebarDrawer menuItems={menuItems}/>
                </Box>
            </Box>
            }
            <Box>
              <Suspense>
                <Outlet/>
              </Suspense>
            </Box>
          </Box>

          <ToastContainer 
            position="bottom-right"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </FiltrosProvider>

    </React.Fragment>
  )
}

export default App
