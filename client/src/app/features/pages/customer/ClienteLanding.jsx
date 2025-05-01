import React from 'react'
import { Grid, Box, Typography, Button } from '@mui/material';

const ClienteLanding = () => {
  return (
      <Box>
          <Grid container spacing={2}>
            <Grid size={8}>
              <Box sx={{mt:8, display:'flex', flexDirection:'column'}}>
                <Typography sx={{color:'orange', fontSize:'1.2rem', fontWeight:'bold', textTransform:'uppercase'}}>
                  Conozca los mejores destinos
                </Typography>
                <Box sx={{width:'75%', mt: 4}}>
                  <Typography variant='h2' sx={{ color: '#005792', textTransform:'uppercase', fontWeight:'bold'}}>
                    Viaja por diferentes partes del mundo y descubre nuevas experiencas
                  </Typography>
                  <Typography variant='subtitle1' sx={{color:'#f70776'}}>
                  Desde Arenas Blancas hasta Cumbres Nevadas: Un Abanico de Posibilidades en Nuestras Imperdibles Categorías.
                  </Typography>
                  <Box sx={{flexWrap:'wrap', mt:2}} >
                    <Button variant='contained' sx={{backgroundColor:'#fdb44b'}}>Descubre</Button>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid size={8}>

            </Grid>
          </Grid>
      </Box>
  )
}

export default ClienteLanding