import React from 'react';
import { Box, Typography } from '@mui/material';

const CardDestino = ({ Url, Nombre, Tours}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

      <Box
        sx={{
          width: 150,
          height: 200,
          borderRadius: '50%', 
          overflow: 'hidden',  
          mb: 2, 
        }}
      >
        <img
          src= {Url}
          alt={Nombre}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover', 
          }}
        />
      </Box>

      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
        {Nombre}
      </Typography>
      <Typography variant="subtitle2" sx={{ color: 'gray' }}>
        {Tours} tours
      </Typography>
    </Box>
  );
};

export default CardDestino;