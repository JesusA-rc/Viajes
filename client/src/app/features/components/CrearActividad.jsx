import { Box, Typography } from '@mui/material'
import React from 'react'

const CrearActividad = () => {
  return (
    <Box sx={{display:'flex', 
        flexDirection:'column',
        gap:2,
        mt:2,
        backgroundColor: '#393e46',
        width:'80%',
        padding:2,
        borderRadius:'5px'
    }}>
        <Typography variant='subtitle1' sx={{color:'#8594e4', fontWeight:'bold'}}>Actividad</Typography>
    </Box>
  )
}

export default CrearActividad