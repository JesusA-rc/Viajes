import { Navigate, Outlet, useLocation } from "react-router";
import { Typography } from "@mui/material";
import { useUsuarios } from "../../lib/hooks/useUsuarios";

export default function RequiereAuth() {
    const { currentUser, loadingUserInfo } = useUsuarios();
    const location = useLocation();

    if(loadingUserInfo) return <Typography>Loading...</Typography>

    if(!currentUser) return <Navigate to='clientes/login' state={{from:location}}/>
    

  return (
    <Outlet />
    
  )
}
