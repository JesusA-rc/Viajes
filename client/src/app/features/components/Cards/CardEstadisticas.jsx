import { Box, Typography, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import React, { useState } from 'react';
import styles from '../../../css/Card_content_color.module.css';

const CardEstadisticas = ({ nombreCard, cantNumero, promedio, destinos }) => {

    const [currentIndex, setCurrentIndex] = useState(0);
    
    const destinosConImagen = destinos?.filter(destino => destino.imagen) || [];
    
    const totalGroups = Math.ceil(destinosConImagen.length / 2);

    const currentImages = destinosConImagen.slice(currentIndex * 2, (currentIndex + 1) * 2);
    
    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % totalGroups);
    };
    
    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + totalGroups) % totalGroups);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2, width: '300px', gap: 3 }} className={styles.Card_content_color}>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant='h6' sx={{ color: '#a2a8d3', fontWeight: 'bold' }}>{nombreCard}</Typography>
                <Box sx={{ bgcolor: 'orange', padding: 0.5, borderRadius: '50%' }}>
                    <Typography variant='subtitle2' sx={{ color: 'white' }}>{destinosConImagen.length}</Typography>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white' }}>
                    <Typography variant='subtitle1'>{cantNumero}</Typography>
                    <Typography variant='subtitle2'>Cant. Visitado</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white' }}>
                    <Typography variant='subtitle1'>{promedio}</Typography>
                    <Typography variant='subtitle2'>Promedio</Typography>
                </Box>
            </Box>

            {destinosConImagen.length > 0 ? (
                <Box sx={{ position: 'relative' }}>

                    {totalGroups > 1 && (
                        <>
                            <IconButton
                                onClick={handlePrev}
                                sx={{
                                    position: 'absolute',
                                    left: -16,
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    backgroundColor: 'rgba(0,0,0,0.5)',
                                    color: 'white',
                                    zIndex: 1,
                                    '&:hover': {
                                        backgroundColor: 'rgba(0,0,0,0.7)'
                                    }
                                }}
                            >
                                <ChevronLeft />
                            </IconButton>
                            <IconButton
                                onClick={handleNext}
                                sx={{
                                    position: 'absolute',
                                    right: -16,
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    backgroundColor: 'rgba(0,0,0,0.5)',
                                    color: 'white',
                                    zIndex: 1,
                                    '&:hover': {
                                        backgroundColor: 'rgba(0,0,0,0.7)'
                                    }
                                }}
                            >
                                <ChevronRight />
                            </IconButton>
                        </>
                    )}

                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: 1,
                        minHeight: '120px'
                    }}>
                        {currentImages.map((destino, index) => (
                            <Box
                                key={`${destino.idDestino}-${index}`}
                                sx={{
                                    position: 'relative',
                                    paddingTop: '100%', 
                                    borderRadius: '8px',
                                    overflow: 'hidden'
                                }}
                            >
                                <Box
                                    component="img"
                                    src={destino.imagen}
                                    alt={destino.nombre}
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transition: 'transform 0.3s',
                                        '&:hover': {
                                            transform: 'scale(1.05)'
                                        }
                                    }}
                                />


                            </Box>
                        ))}
                    </Box>

                    {totalGroups > 1 && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1, gap: 1 }}>
                            {Array.from({ length: totalGroups }).map((_, index) => (
                                <Box
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    sx={{
                                        width: 8,
                                        height: 8,
                                        borderRadius: '50%',
                                        backgroundColor: currentIndex === index ? 'orange' : 'rgba(255,255,255,0.3)',
                                        cursor: 'pointer',
                                        transition: 'background-color 0.3s'
                                    }}
                                />
                            ))}
                        </Box>
                    )}
                </Box>
            ) : (
                <Typography variant="body2" sx={{ color: 'white', textAlign: 'center' }}>
                    No hay imágenes disponibles
                </Typography>
            )}
        </Box>
    );
};

export default CardEstadisticas;