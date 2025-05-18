import { Box, Typography } from '@mui/material';
import { useDestinos } from '../../../../lib/hooks/useDestinos';
import MediaSection from '../../components/MediaSection';
import styles from '../../../css/Grid2Column.module.css';
import StatsSection from '../../components/Stats/StatsSection';
import CrearActividad from '../../components/CrearActividad';
import UserBanner from '../../components/UserBanner';
import { useGetFavoritos, useUsuarios } from '../../../../lib/hooks/useUsuarios';

const Profile = () => {
  const { currentUser, loadingUserInfo} = useUsuarios();
  const { destinos, isPending } = useDestinos();
  const { data: favoritos, isLoadingFavoritos, isErrorFavoritos } = useGetFavoritos(
    !loadingUserInfo && currentUser ? currentUser.id : null
  );

  if (loadingUserInfo || !currentUser) {
    return <Typography>Cargando...</Typography>;
  }

  if (isErrorFavoritos) {
    return <Typography color="error">Error al cargar los favoritos.</Typography>;
  }

  const favoritosList = Array.isArray(favoritos) ? favoritos : [];

  const statsData = [
    { value: '496', label: 'T ' },
    { value: '169.5', label: 'Days Watched' },
    { value: '79.6', label: 'Mean Score' },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', backgroundColor: '#222831', minHeight:'100vh' }}>
      <UserBanner />

      <Box sx={{ display: 'flex', width: '100%', padding: 10 }} className={styles.grid2}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} className={styles.gridLeft}>

          {isLoadingFavoritos ? (
              <Typography sx={{ color: 'white', textAlign: 'center' }}>Cargando favoritos...</Typography>
            ) : favoritosList.length > 0 ? (
              <MediaSection title='Favoritos' items={favoritosList} />
            ) : (
              <Typography sx={{ color: 'white', textAlign: 'center' }}>No hay favoritos disponibles.</Typography>
          )}

          {isPending ? (
              <Typography sx={{ color: 'white', textAlign: 'center' }}>Cargando destinos...</Typography>
            ) : (
              <MediaSection title='Categorias' items={destinos} />
          )}
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} className={styles.gridRight}>
          <StatsSection stats={statsData} />
          <CrearActividad />
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;