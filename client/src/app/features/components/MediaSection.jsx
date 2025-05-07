import React from 'react';
import { Box, Typography } from '@mui/material';

const MediaSection = ({ title, items }) => {
    return (
        <Box sx={{ mb: 4, height: 'auto', backgroundColor: '#393e46', padding: 2, borderRadius: '15px', width:'100%' }}>
            <Typography variant="h6" gutterBottom sx={{color: '#eeeeee', fontWeight: 'bold'}}>
                {title}
            </Typography>

            {items && items.length > 0 ? (
                <Box display="flex" flexWrap="wrap" gap={2} >
                    {items.map((item, index) => (
                        <Box key={index} sx={{width:'140px', height: '150px'}}> 
                            <img  src={item.imagen} alt={item.title} />
                        </Box>
                    ))}
                </Box>
            ) : (
                <Typography variant="body1" color="text.secondary">
                    No tienes destinos favoritos
                </Typography>
            )}
        </Box>
    );
};

export default MediaSection;