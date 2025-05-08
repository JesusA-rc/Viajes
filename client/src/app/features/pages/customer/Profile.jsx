import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useDestinos } from '../../../../lib/hooks/useDestinos';
import { useUsuarios } from '../../../../lib/hooks/useUsuarios';
import MediaSection from '../../components/MediaSection';
import styles from '../../../css/Grid2Column.module.css';
import StatsSection from '../../components/Stats/StatsSection';
import CrearActividad from '../../components/CrearActividad';
import UserBanner from '../../components/UserBanner';

const Profile = () => {
  const usuarioId = parseInt(localStorage.getItem('userId'), 10);
  console.log('Usuario ID:', usuarioId); // Depuración

  const { destinos, isPending } = useDestinos();
  const { getFavoritos } = useUsuarios();
  const [favoritos, setFavoritos] = useState([]);
  const [loadingFavoritos, setLoadingFavoritos] = useState(true);
  const [errorFavoritos, setErrorFavoritos] = useState(null);

  useEffect(() => {
    if (!usuarioId || isNaN(usuarioId)) {
      setErrorFavoritos('ID de usuario no válido');
      setLoadingFavoritos(false);
      return;
    }

    const cargarFavoritos = async () => {
      try {
        const datosFavoritos = await getFavoritos(usuarioId);
        console.log('Favoritos recibidos:', datosFavoritos);
        setFavoritos(datosFavoritos);
      } catch (error) {
        console.error('Error al cargar favoritos:', error);
        setErrorFavoritos('Error al cargar favoritos');
      } finally {
        setLoadingFavoritos(false);
      }
    };

    cargarFavoritos();
  }, [usuarioId]);

  if (isPending) {
    return <Typography>Cargando destinos...</Typography>;
  }

  if (loadingFavoritos) {
    return <Typography>Cargando favoritos...</Typography>;
  }

  if (errorFavoritos) {
    return <Typography color="error">{errorFavoritos}</Typography>;
  }

  const statsData = [
    { value: '496', label: 'T ' },
    { value: '169.5', label: 'Days Watched' },
    { value: '79.6', label: 'Mean Score' },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', backgroundColor: '#222831' }}>
      <UserBanner />

      <Box sx={{ display: 'flex', width: '100%', padding: 10 }} className={styles.grid2}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} className={styles.gridLeft}>
          {favoritos.length > 0 && (
            <MediaSection title='Favoritos' items={favoritos} />
          )}
          <MediaSection title='Categorias' items={destinos} />
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