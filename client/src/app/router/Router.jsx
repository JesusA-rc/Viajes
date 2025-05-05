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
            {path: 'clientes', element: <ClienteLanding/>},
            {path: 'clientes/register', element: <ClienteRegister/>},
            {path: 'clientes/login', element: <ClienteLogin/>},
        ]
    }
])

