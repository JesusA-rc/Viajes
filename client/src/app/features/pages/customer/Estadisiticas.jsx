import { Box, Grid, Typography, ButtonGroup, Button } from '@mui/material'
import UserBanner from '../../components/UserBanner';
import React, {useState} from 'react'
import GrupoBotones from '../../components/buttons/GrupoBotones';
import { useGetEstadosByUsuarioId } from '../../../../lib/hooks/useEstadosDestino'; 
import CardEstadisticas from '../../components/Cards/CardEstadisticas';

const Estadisiticas = () => {
    const listEstadisticas = ['Categorias','Guias','Turismo'];
    const [activeButton, setActiveButton] = useState('1'); 
    const buttons = [
        { value: '1', label: 'Cantidad visitado' },
        { value: '2', label: 'Promedio' },
    ];

    const usuarioId = parseInt(localStorage.getItem('userId'), 10);
    const { data: allDestinosUsuarios, isLoading } = useGetEstadosByUsuarioId(usuarioId);

    if(isLoading){
        return <Typography>Cargando estadisticas...</Typography>
    }   

    const destinosPorCategoria = allDestinosUsuarios?.reduce((acc, destinoUsuario) => {
        destinoUsuario.destino.categorias?.forEach(categoria => {
            if (!acc[categoria]) {
                acc[categoria] = [];
            }
            acc[categoria].push({
                idDestino: destinoUsuario.destino.idDestino,
                nombre: destinoUsuario.destino.nombre,
                imagen: destinoUsuario.destino.imagen,
                estado: destinoUsuario.estado
            });
        });
        return acc;
    }, {});
    
    console.log(allDestinosUsuarios)



  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', backgroundColor: '#222831' }}>
        <UserBanner/>
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
                                listEstadisticas.map((e,index) =>
                                    <Box sx={{display:'flex',padding:0.5,width:'100%', cursor:'pointer'}}>
                                        <Typography variant='subtitle2' key={index} sx={{color:'white', fontWeight:'bold'}}>{e}</Typography>
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
                                {destinosPorCategoria && Object.entries(destinosPorCategoria).map(([categoria, destinos]) => (
                                    <CardEstadisticas 
                                        key={categoria}
                                        nombreCard={categoria}
                                        cantNumero={1} 
                                        promedio={45.67} 
                                        destinos={destinos} 
                                    />
                                ))}
                           </Box>
                        </Box>
                    </Grid>
                </Grid>


        </Box>
    </Box>
  )
}

export default Estadisiticas