import React from 'react'
import { Box, Typography	 } from '@mui/material'; 

const UserCustomProfile = () => {
      const backgroundImageUser = 'https://img.freepik.com/foto-gratis/fondo-galaxia-estilo-anime_23-2151133974.jpg';
      const profileUserImg = 'https://i.pinimg.com/736x/5a/62/ea/5a62ea77b66097b7ea1f5a35e749cf2a.jpg';
  return (
    <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      backgroundImage: `url("${backgroundImageUser}")`, 
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      height: '250px',
      position: 'relative',
    }}
  >
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        bottom: '20px',
        left: '20px', 
      }}
    >
      <Box
        component="img"
        src={profileUserImg} 
        alt="Perfil del usuario"
        sx={{
          width: '100px',
          height: '100px', 
          marginRight: 2,
        }}
      />
      <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold' }}>
        kyubimoon
      </Typography>
    </Box>
  </Box>
  )
}

export default UserCustomProfile