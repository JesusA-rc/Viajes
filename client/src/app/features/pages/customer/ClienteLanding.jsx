import React from 'react'
import PopularDestinations from '../../components/PopularDestinos';
import { Grid, Box, Typography, Button } from '@mui/material';
import PopularCategorias from '../../components/PopularCategorias';
import FormasDePago from '../../components/FormasDePago';
import Nosotros from '../../components/Nosotros';

const ClienteLanding = () => {
  const paddinggContent = 5;
  const urlImg = 'https://visitapuertovallarta.com.mx/uploads/1626/malecon-playa.jpg';
  const imagesRight = [
    'https://upload.wikimedia.org/wikipedia/commons/b/b7/MUSAVE_Frente.jpg',
    'https://i0.wp.com/foodandpleasure.com/wp-content/uploads/2024/09/gran-acuario-mazatlan0-1.jpg?fit=1200%2C900&ssl=1',
    'https://upload.wikimedia.org/wikipedia/commons/d/df/MTY_20080203_215709.JPG',
  ];
  return (
    <Box sx={{backgroundColor:'#f4f4f4', display:'flex', flexDirection:'column'}}>  
      <Box
      sx={{
        backgroundImage:`url(${urlImg})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh', 
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        padding: paddinggContent
      }}>
          <Grid container spacing={2} sx={{mt:5}}>
            <Grid size={8}>
              <Box sx={{display:'flex', flexDirection:'column'}}>
                <Typography sx={{color:'#e8630a', fontSize:'1.4rem', fontWeight:'bold', textTransform:'uppercase'}}>
                  Conozca los mejores destinos
                </Typography>
                <Box sx={{width:'75%', mt: 4}}>
                  <Typography variant='h2' sx={{ color: '#222831', textTransform:'uppercase', fontWeight:'bold'}}>
                    Viaja por diferentes partes del mundo y descubre nuevas experiencas
                  </Typography>
                  <Typography variant='subtitle1' sx={{color:'#225763', fontWeight: 'bold'}}>
                  Desde Arenas Blancas hasta Cumbres Nevadas: Un Abanico de Posibilidades en Nuestras Imperdibles Categorías.
                  </Typography>
                  <Box sx={{flexWrap:'wrap', mt:2}} >
                    <Button variant='contained' sx={{backgroundColor:'#fdb44b'}}>Descubre</Button>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid size={4}>
              <Grid container spacing={2} direction="column" alignItems="center">
                {imagesRight.map((image, index) => (
                  <Grid item key={index}>
                    <img
                      src={image}
                      alt={`Imagen ${index + 1}`}
                      style={{
                        maxWidth: '100%',
                        width: '100%',
                        borderRadius: '8px',
                        border: '2px solid yellow', 
                        objectFit: 'cover', 
                        height: '10rem'
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
      </Box>

      <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', padding: paddinggContent, gap: 10}}>
        <PopularDestinations/>
        <PopularCategorias/>
        <FormasDePago/>
      </Box>

      <Box sx={{display:'flex', flexDirection:'column'}}>
        <Nosotros/>
      </Box>



    </Box>
  )
}

export default ClienteLanding