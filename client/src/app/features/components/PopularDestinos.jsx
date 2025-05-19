import React, { useState } from 'react';
import { Box, Typography, IconButton, useMediaQuery } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CardDestino from './Cards/CardDestino';
import { useDestinos } from '../../../lib/hooks/useDestinos';

const PopularDestinos = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { destinos, isPending } = useDestinos();
  const isMobile = useMediaQuery('(max-width:600px)'); 
  const isTablet = useMediaQuery('(min-width:601px) and (max-width:1024px)'); 

  if (isPending) {
    return <Typography>Cargando destinos...</Typography>;
  }

  const itemsPerPage = isMobile ? 1 : isTablet ? 4 : 6; 
  
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + itemsPerPage, destinos.length - itemsPerPage)
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
  };

  const visibleItems = destinos.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
          Destinos populares
        </Typography>
        <Typography variant="subtitle1">
          Siempre habrá un destino que se adapte a tus gustos
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', mt:3 }}>

        <IconButton
          onClick={handlePrev}
          aria-label="flecha-izquierda"
          sx={{ color: '#e8630a' }}
          disabled={currentIndex === 0} 
        >
          <ArrowBackIcon fontSize="large" />
        </IconButton>

        <Box sx={{ display: 'flex', gap: 2 }}>
          {visibleItems.map((d) => (
            <CardDestino key={d.idDestino} Url={d.imagen} Nombre={d.nombre} Tours={d.tours} />
          ))}
        </Box>

        <IconButton
          onClick={handleNext}
          aria-label="flecha-derecha"
          sx={{ color: '#e8630a' }}
          disabled={currentIndex + itemsPerPage >= destinos.length} 
        >
          <ArrowForwardIcon fontSize="large" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default PopularDestinos;