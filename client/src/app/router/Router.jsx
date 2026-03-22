import { createBrowserRouter, Link } from 'react-router-dom'
import App from '../App'
import RequiereAuth from './RequiereAuth.jsx'
import { queryClient } from '../../lib/queryClient.js';
import agent from '../../lib/api/agent.js';
import ClienteLayout from '../features/pages/customer/ClienteLayout.jsx';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        errorElement: <div style={{background: 'red', color: 'white', padding: '20px'}}>ERROR CRITICAL: <Link to="/" style={{color: 'white'}}>Volver</Link></div>,
        children: [
            {
                path: '', 
                lazy: () => import('../features/pages/HomePage.jsx').then(m => ({ Component: m.default }))
            },
            {
                path: 'adminHp', 
                lazy: () => import('../features/pages/Admin/AdminHomePage.jsx').then(m => ({ Component: m.default }))
            },
            {
                path: 'adminDestinos', 
                lazy: () => import('../features/pages/Admin/Destinos/AdminDestinos.jsx').then(m => ({ Component: m.default }))
            },
            {
                path: 'adminCrearCategoria', 
                lazy: () => import('../features/pages/Admin/Categorias/AdminAgregarCategoria.jsx').then(m => ({ Component: m.default }))
            },
            {
                path: 'adminCategorias', 
                lazy: () => import('../features/pages/Admin/Categorias/AdminCategorias.jsx').then(m => ({ Component: m.default }))
            },
            {
                path: 'adminEditarCategoria', 
                lazy: () => import('../features/pages/Admin/Categorias/AdminEditarCategoria.jsx').then(m => ({ Component: m.default }))
            },
            {
                path: 'adminAgregarDestinos', 
                lazy: () => import('../features/pages/Admin/Destinos/AdminAgregarDestinos.jsx').then(m => ({ Component: m.default }))
            },
            {
                path: 'admindEditarDestino', 
                lazy: () => import('../features/pages/Admin/Destinos/AdminEditarDestinos.jsx').then(m => ({ Component: m.default }))
            },
            {
                path: 'company', 
                lazy: () => import('../features/pages/customer/ClienteLanding.jsx').then(m => ({ Component: m.default }))
            },
            {
                path: 'clientes/register', 
                lazy: () => import('../features/pages/customer/ClienteRegister.jsx').then(m => ({ Component: m.default }))
            },
            {
                path: 'clientes/login', 
                lazy: () => import('../features/pages/customer/ClienteLogin.jsx').then(m => ({ Component: m.default }))
            },
            {
                path: '/adminDestinos/ver', 
                lazy: () => import('../features/pages/Admin/AdminVer.jsx').then(m => ({ Component: m.default }))
            },
            {
                path: '/adminDestinos/crear', 
                lazy: () => import('../features/pages/AdminCrear.jsx').then(m => ({ Component: m.default }))
            },
            {
                element: <RequiereAuth />,
                loader: async () => {
                   return await queryClient.ensureQueryData({
                       queryKey: ['usuarioActual'],
                       queryFn: async () => {
                           const response = await agent.get('/account/user-info');
                           return response.data;
                       }
                   });
                },
                children: [
                    { 
                        element: <ClienteLayout />,
                        children: [
                            { 
                                path: '/clientes/destinos-list', 
                                lazy: () => import('../features/pages/customer/DestinosList.jsx').then(m => ({ Component: m.default })) 
                            },
                            { 
                                path: '/clientes/estadisticas', 
                                lazy: () => import('../features/pages/customer/Estadisiticas.jsx').then(m => ({ Component: m.default })) 
                            },
                            { 
                                path: '/clientes/buscar/destinos', 
                                lazy: () => import('../features/pages/customer/BuscarPagina.jsx').then(m => ({ Component: m.default })) 
                            },
                            { 
                                path: '/clientes/profile', 
                                lazy: () => import('../features/pages/customer/Profile.jsx').then(m => ({ Component: m.default })) 
                            },
                            { 
                                path: '/clientes/configuracion/:id', 
                                lazy: () => import('../features/pages/customer/ClienteConfiguracion.jsx').then(m => ({ Component: m.default })) 
                            },
                            { 
                                path: '/clientes/destinos/:id', 
                                lazy: () => import('../features/pages/customer/DestinoPage.jsx').then(m => ({ Component: m.default })) 
                            }
                        ]
                    }
                ]
            }
        ]
    }
])

