import React, { useState } from 'react';
import { Box, Card, CardContent, CardMedia, Typography, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const ImageCard = ({ image, title, idDestino }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'center',
          gap: 2,
          width: 190,
          borderRadius: 5,
          overflow: 'hidden',
          cursor: 'pointer'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >

        <Box
          component="img"
          sx={{
            height: 255,
            width: '100%',
            borderRadius: 5,
            position: 'relative',
          }}
          alt={title}
          src={image}
        />

        {isHovered && (
          <Tooltip title="Editar">
            <IconButton
              sx={{
                position: 'absolute',
                bottom: 46,
                right: 8,
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.7)', 
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.9)', 
                },
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        )}

        <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 'bold' }}>
          {title}
        </Typography>
      </Box>
    </Box>
  );
};

export default ImageCard;