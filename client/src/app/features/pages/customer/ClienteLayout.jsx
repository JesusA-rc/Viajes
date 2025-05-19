import { Box } from '@mui/material';
import UserBanner from '../../components/UserBanner';
import { Outlet } from 'react-router';

const ClienteLayout = () => {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      width: '100%', 
      backgroundColor: '#222831', 
      minHeight: '100vh' 
    }}>
      <UserBanner />
      <Outlet />
    </Box>
  );
};

export default ClienteLayout;