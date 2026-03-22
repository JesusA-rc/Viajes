import { Navigate, Outlet, useLocation } from "react-router";
import { useUsuarios } from "../../lib/hooks/useUsuarios";

export default function RequiereAuth() 
{
    const { currentUser } = useUsuarios();
    const location = useLocation();

    if(!currentUser) return <Navigate to='clientes/login' state={{from:location}}/>
    
  return (
    <Outlet />
  )
}
