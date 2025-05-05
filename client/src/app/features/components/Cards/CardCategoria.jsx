import React from 'react'
import { Box, Typography } from '@mui/material'

const CardCategoria = ({Nombre, Descripcion}) => {


  return (
    <Box sx={{display:'flex', flexDirection:'column', border: '1px solid gray', padding:2, borderRadius:5 }}>
      <Box
        sx={{
          width: 320,
          height: 170,
          borderRadius: '15px', 
          overflow: 'hidden',  
          mb: 2, 
        }}
      >
        <img
          src= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw0DJYZiAfRLB6G6wmN46an1CY_lBIP_9zKQ&s"
          alt={Nombre}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover', 
          }}
        />
      </Box>
      <Box sx={{display:'flex', flexDirection:'column'}}>
        <Typography variant='subtitle1' sx={{fontWeight:'bold'}}>{Nombre}</Typography>
        <Typography variant='subtitle2' >{Descripcion}</Typography>
      </Box>

    </Box>
  )
}

export default CardCategoria