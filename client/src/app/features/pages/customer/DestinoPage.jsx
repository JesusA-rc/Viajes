import { Box, Typography, Grid, Card, CardContent, CardMedia, IconButton } from '@mui/material';
import React from 'react';
import { useDestinoByID } from '../../../../lib/hooks/useDestinos';
import { useParams } from 'react-router';
import { useFavoritosUsuario } from '../../../../lib/hooks/useFavoritosUsuario';
import { useProfile } from '../../../../lib/hooks/useProfile';
import FavoritoButton from '../../components/buttons/FavoritoButton';

const DestinoPage = () => {
    const { id: idDestino } = useParams();
    const { data: destino, isLoading, isError} = useDestinoByID(idDestino);
    const { currentUser, loadingUserInfo } = useProfile();
    const { isFavorito, addFavorito, removeFavorito } = useFavoritosUsuario(
        !loadingUserInfo && currentUser ? currentUser.id : null
    );

    const handleToggleFavorito = async () => {
        try {
        if (isFavorito(destino.idDestino)) {
            await removeFavorito({ 
            usuarioId: currentUser.id, 
            destinoId: destino.idDestino
            });
        } else {
            await addFavorito({ 
            UsuarioId: currentUser.id, 
            DestinoId: destino.idDestino
            });
        }
        } catch (error) {
        console.error("Error en favoritos:", error);
        }
   };

    if (isLoading) return <Typography variant='h1' sx={{ color: 'white', textAlign: 'center', mt: 4 }}>Cargando destino...</Typography>;
    if (isError) return <Typography variant='h5' 
    sx={{ color: 'white', textAlign: 'center', mt: 4, }}>Destino no encontrado.</Typography>;

    return (
        <Box sx={{
            backgroundColor: '#1e1e2f',
            color: 'white',
            minHeight: '100vh',
            padding: { xs: 2, md: 4 },
            display: 'flex',
            flexDirection: 'column',
            gap: 4
        }}>
            <Card sx={{
                position: 'relative',
                boxShadow: 6,
                borderRadius: 3,
                overflow: 'hidden'
            }}>
                <CardMedia
                    component="img"
                    height="500"
                    image={destino?.imagen}
                    alt={destino?.nombre}
                    sx={{
                        objectFit: 'cover',
                        filter: 'brightness(0.9)',
                    }}
                />
                <CardContent sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    background: 'rgba(0, 0, 0, 0.7)',
                    color: 'white',
                    padding: 3,
                    textAlign: 'left'
                }}>
                    <Typography gutterBottom variant="h3" sx={{color:'white', fontWeight:'bold'}}>
                        {destino?.nombre}
                    </Typography>
                    <Typography variant="h6" sx={{color:'#fdb44b', fontWeight:'bold'}}>
                        {destino?.pais}, {destino?.region}
                    </Typography>

                    <FavoritoButton
                        isFavorito={isFavorito(destino.idDestino)}
                        onToggle={handleToggleFavorito}
                    />
                </CardContent>
            </Card>

            <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                    <Card sx={{
                        p: 3,
                        bgcolor: '#2a2a3b',
                        borderRadius: 2,
                        boxShadow: 3
                    }}>
                        <Typography variant="h5" sx={{color:'white', fontWeight:'bold'}}>
                            Descripción
                        </Typography>
                        <Typography variant="body1" sx={{color:'#bae8e8', fontWeight:'bold'}}>
                            {destino?.descripcion || 'Sin descripción'}
                        </Typography>
                    </Card>
                </Grid>

            </Grid>

        </Box>
    );
};

export default DestinoPage;