import { Box, Grid, Typography, ButtonGroup, Button } from '@mui/material'
import UserBanner from '../../components/UserBanner';
import React, {useState} from 'react'
import GrupoBotones from '../../components/buttons/GrupoBotones';
import { useGetEstadosByUsuarioId } from '../../../../lib/hooks/useEstadosDestino'; 
import CardEstadisticas from '../../components/Cards/CardEstadisticas';
import { useProfile } from '../../../../lib/hooks/useProfile';

const Estadisiticas = () => {

    const { currentUser, loadingUserInfo } = useProfile();
    const { data: allDestinosUsuarios, isLoading } = useGetEstadosByUsuarioId(
        !loadingUserInfo && currentUser ? currentUser.id : null
    );
 
    const listEstadisticas = ['Categorias','Guias','Turismo'];
    const [activeButton, setActiveButton] = useState('1'); 
    const buttons = [
        { value: '1', label: 'Cantidad visitado' },
        { value: '2', label: 'Promedio' },
    ];

    if(isLoading){
        return <Typography>Cargando estadisticas...</Typography>
    }   



    const destinosPorCategoria = allDestinosUsuarios?.reduce((acc, destinoUsuario) => {
        destinoUsuario.destino.categorias?.forEach(categoria => {
            if (!acc[categoria.nombre]) {
            acc[categoria.nombre] = {
                idCategoria: categoria.idCategoria,
                nombreCategoria: categoria.nombre,
                destinos: []
            };
            }

            acc[categoria.nombre].destinos.push({
                idEstado: destinoUsuario.id, 
                idDestino: destinoUsuario.destino.idDestino,
                nombre: destinoUsuario.destino.nombre,
                imagen: destinoUsuario.destino.imagen,
                estado: destinoUsuario.estado
            });
        });

        return acc;
    }, {});


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', backgroundColor: '#222831', minHeight: '100vh' }}>

        <Box sx={{ 
                display:'flex',
                flexDirection:'column',
                padding: { xs: 2, md: 3 },
                width: '100%'
            }}>
                <Grid  container spacing={3} sx={{ 
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '10% 80%' },
                    width: '100%',
                    gap:10
                }}>
                    <Grid item xs={12} md={3}>
                        <Box sx={{display:'flex',flexDirection:'column', gap:2,width:'100%',bgcolor: '#393e46',padding:.5}}>
                            {
                                listEstadisticas.length > 0 && 
                                    listEstadisticas.map((e) =>
                                        <Box  key={e} sx={{display:'flex',padding:0.5,width:'100%', cursor:'pointer'}}>
                                            <Typography variant='subtitle2'  sx={{color:'white', fontWeight:'bold'}}>{e}</Typography>
                                        </Box>
                                ) 
                            }
                        </Box>

                    </Grid>
                    <Grid item xs={12} md={9}>
                        <Box sx={{display:'flex',flexDirection:'column',width:'100%'}}>
                           <Box sx={{display:'flex', justifyContent:'space-between'}}>
                                <Typography variant='h5' sx={{color:'white',fontWeight:'bold'}}>Categorias</Typography>
                                <Box sx={{
                                    display: 'flex',
                                    bgcolor: '#393e46',
                                    padding: 0.2,
                                    borderRadius: '12px', 
                                    overflow: 'hidden',
                                    gap:2
                                }}>
      
                                    <GrupoBotones
                                        buttons={buttons}
                                        activeButton={activeButton}
                                        setActiveButton={setActiveButton}
                                    />

                                </Box>
                           </Box>

                           <Box sx={{display:'flex', alignItems:'center', justifyContent:'center' , width:'100%',flexWrap:'wrap',mt:4, gap: 4}}>
                                {destinosPorCategoria && Object.keys(destinosPorCategoria).length > 0 ? (
                                    Object.values(destinosPorCategoria).map(categoria => (
                                        <CardEstadisticas 
                                            key={categoria.idCategoria}
                                            nombreCard={categoria.nombreCategoria}
                                            cantNumero={categoria.destinos.length} 
                                            promedio={45.67}
                                            destinos={categoria.destinos}
                                        />
                                    ))
                                ) : (
                                <Typography variant='body1' sx={{color:'white', fontWeight:'bold'}}>No hay datos disponibles</Typography>
                                )}
                           </Box>
                        </Box>
                    </Grid>
                </Grid>


        </Box>
    </Box>
  )
}

export default Estadisiticas