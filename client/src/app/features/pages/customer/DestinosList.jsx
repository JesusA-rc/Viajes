import React, { useContext } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import UserBanner from '../../components/UserBanner';
import CardDestinoNombre from '../../components/Cards/CardDestinoNombre';
import GrupoFiltros from '../../components/GrupoFiltros';
import { useGetEstadosByUsuarioId } from '../../../../lib/hooks/useEstadosDestino'; 
import { FiltrosContext } from '../../contexts/FiltrosContext';

const DestinosList = () => {
    const usuarioId = parseInt(localStorage.getItem('userId'), 10);
    
    const { data: allDestinosUsuarios, isLoading } = useGetEstadosByUsuarioId(usuarioId);
    const { filtros } = useContext(FiltrosContext); 

    const destinosFiltrados = filtros.estado === 'All' 
        ? allDestinosUsuarios 
        : allDestinosUsuarios?.filter(destino => destino.estado === filtros.estado);
    
    return (
        <Box sx={{ backgroundColor: '#222831', minHeight: '100vh' }}>
            <UserBanner />

            <Box sx={{ 
                display:'flex',
                flexDirection:'column',
                padding: { xs: 2, md: 3 },
                width: '100%'
            }}>
                <Grid container spacing={3} sx={{ 
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '20% 75%' },
                    width: '100%'
                }}>
                    <Grid item xs={12} md={3}>
                        <Box sx={{ width: '100%', height: '100%' }}>
                            <GrupoFiltros />
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={9}>
                        <Box sx={{ width: '100%' }}>
                            {isLoading ? (
                                <Typography sx={{ color: 'white', textAlign: 'center' }}>
                                    Cargando destinos del usuario...
                                </Typography>
                            ) : (
                                <CardDestinoNombre 
                                    itemCard={destinosFiltrados?.map(estado => ({
                                        ...estado.destino, 
                                        estado: estado.estado 
                                    }))}
                                />
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default DestinosList;