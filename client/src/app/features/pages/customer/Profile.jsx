import React from 'react';
import { Box, Typography } from '@mui/material';
import NavBarCliente from './NavBarCliente';
import UserCustomProfile from './UserCustomProfile';
import { useDestinos } from '../../../../lib/hooks/useDestinos';
import MediaSection from '../../components/MediaSection';
import styles from '../../../css/Grid2Column.module.css';
import StatsSection from '../../components/Stats/StatsSection';
import CrearActividad from '../../components/CrearActividad';
import UserBanner from '../../components/UserBanner';

const Profile = () => {

  const {destinos, isPending} = useDestinos();

  if (isPending) {
    return <Typography>Cargando destinos...</Typography>;
  }

  const statsData = [
    { value: '496', label: 'T ' },
    { value: '169.5', label: 'Days Watched' },
    { value: '79.6', label: 'Mean Score' },
  ];

  return (
    <Box sx={{display:'flex',flexDirection:'column', width:'100%', backgroundColor: '#222831'}}>
      <UserBanner/>

      <Box sx={{display:'flex', width:'100%', padding:10}} classname={styles.grid2}>
        <Box sx={{display:'flex', flexDirection:'column', alignItems:'center'}} className={styles.gridLeft}>
          <MediaSection title='Destinos' items={destinos}/>
          <MediaSection title='Categorias' items={destinos}/> 
        </Box>
        <Box sx={{display:'flex', flexDirection:'column', alignItems:'center'}} className={styles.gridRight}>
          <StatsSection stats={statsData} />
          <CrearActividad/>
        </Box>
      </Box>

    </Box>
  );
};




export default Profile;