import {createBrowserRouter} from 'react-router'
import HomePage from '../features/pages/HomePage.jsx'
import App from '../App'
import AdminHomePage from '../features/pages/Admin/AdminHomePage.jsx'
import AdminDestinos from '../features/pages/Admin/Destinos/AdminDestinos.jsx'
import AdminCategorias from '../features/pages/Admin/Categorias/AdminCategorias.jsx'
import AdminEditarCategoria from '../features/pages/Admin/Categorias/AdminEditarCategoria.jsx'
import AdminAgregarCategoria from '../features/pages/Admin/Categorias/AdminAgregarCategoria.jsx'
import AdminAgregarDestinos from '../features/pages/Admin/Destinos/AdminAgregarDestinos.jsx'
import AdminEditarDestinos from '../features/pages/Admin/Destinos/AdminEditarDestinos.jsx'
import ClienteLanding from '../features/pages/customer/ClienteLanding.jsx'
import ClienteRegister from '../features/pages/customer/ClienteRegister.jsx'
import ClienteLogin from '../features/pages/customer/ClienteLogin.jsx'
import Profile from '../features/pages/customer/Profile.jsx'
import ProtectedRoute from '../features/pages/customer/ProtectedRoute.jsx'
import DestinosList from '../features/pages/customer/DestinosList.jsx'
import Estadisticas from '../features/pages/customer/Estadisiticas.jsx'
import BuscarPagina from '../features/pages/customer/BuscarPagina.jsx'
import AdminVer from '../features/pages/Admin/AdminVer.jsx'
import AdminCrear from '../features/pages/AdminCrear.jsx'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {path: '', element:<HomePage/> },
            {path: 'adminHp', element:<AdminHomePage/>},
            {path: 'adminDestinos', element: <AdminDestinos/>},
            {path: 'adminCrearCategoria', element: <AdminAgregarCategoria/>},
            {path: 'adminCategorias', element: <AdminCategorias/>},
            {path: 'adminEditarCategoria', element: <AdminEditarCategoria/>},
            {path: 'adminAgregarDestinos', element: <AdminAgregarDestinos/>},
            {path: 'admindEditarDestino', element:  <AdminEditarDestinos/>},
            {path: 'company', element: <ClienteLanding/>},
            {path: 'clientes/register', element: <ClienteRegister/>},
            {path: 'clientes/login', element: <ClienteLogin/>},
            {
                path: 'clientes/profile',
                element: (
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                ),
            },
            {path: '/clientes/destinos-list', element: <DestinosList/>},
            {path: '/clientes/estadisticas', element: <Estadisticas/>},
            {path: '/clientes/buscar/destinos' , element: <BuscarPagina/>},
            {path: '/adminDestinos/ver', element: <AdminVer/>},
            {path: '/adminDestinos/crear', element:<AdminCrear/>}
        ]
    }
])

