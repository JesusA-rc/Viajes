import React, { useContext } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import UserBanner from '../../components/UserBanner';
import CardDestinoNombre from '../../components/Cards/CardDestinoNombre';
import GrupoFiltros from '../../components/GrupoFiltros';
import { useGetEstadosByUsuarioId } from '../../../../lib/hooks/useEstadosDestino'; 
import { FiltrosContext } from '../../contexts/FiltrosContext';
import { useUsuarios } from '../../../../lib/hooks/useUsuarios';

const DestinosList = () => {

    const { currentUser, loadingUserInfo} = useUsuarios();
    
    const { data: allDestinosUsuarios, isLoading } = useGetEstadosByUsuarioId(
        !loadingUserInfo && currentUser ? currentUser.id : null,
    );
    
    const { filtros } = useContext(FiltrosContext); 

    const destinosFiltrados = allDestinosUsuarios?.filter(destino => {
        const estadoMatch = filtros.estado === 'All' || destino.estado === filtros.estado;
        
        const categoriaMatch = (filtros.Categorias === 'All' || filtros.Categorias == undefined) || 
            destino.destino.categorias?.some(c => 
                c.nombre === filtros.Categorias
            );
        
        const busquedaMatch = !filtros.busqueda || 
                            destino.destino.nombre.toLowerCase().includes(filtros.busqueda.toLowerCase());
        
        return estadoMatch && categoriaMatch && busquedaMatch;
    });
    
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
                                        estado: estado.estado,
                                        categorias: estado.destino.categorias
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