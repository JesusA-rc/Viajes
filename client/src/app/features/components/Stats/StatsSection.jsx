import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';

const StatsSection = ({ stats }) => {
    return (
        <Box
            sx={{
                backgroundColor: '#393e46',
                color: 'white',
                padding: 2,
                borderRadius: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '80%',
            }}
        >
            {stats.map((stat, index) => (
                <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                    <Typography variant="subtitle1" sx={{ color: '#ff7e67', fontWeight: 'bold' }}>
                        {stat.value}
                    </Typography>
                    <Typography variant="subtitle1">
                        {stat.label}
                    </Typography>

                    <Box sx={{ position: 'relative', width: '80%', mt:3 }}>

                        <LinearProgress
                            variant="determinate"
                            value={(parseFloat(stat.value) / 1000) * 100} 
                            sx={{ mt: 1, height: 8, borderRadius: 5, width: '100%' }} 
                        />

                        <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>

                            <Box sx={{ position: 'absolute', left: '20%', width: '1px', height: '100%', backgroundColor: 'white' }} />

                            <Box sx={{ position: 'absolute', left: '45%', width: '1px', height: '100%', backgroundColor: 'white' }} />

                            <Box sx={{ position: 'absolute', left: '70%', width: '1px', height: '100%', backgroundColor: 'white' }} />
                        </Box>

                        <Box sx={{ position: 'absolute', top: -20, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>
                            <Typography sx={{ position: 'absolute', left: '20%', transform: 'translateX(-50%)', color: 'white', fontSize: '10px' }}>
                                20
                            </Typography>
                            <Typography sx={{ position: 'absolute', left: '45%', transform: 'translateX(-50%)', color: 'white', fontSize: '10px' }}>
                                40
                            </Typography>
                            <Typography sx={{ position: 'absolute', left: '70%', transform: 'translateX(-50%)', color: 'white', fontSize: '10px' }}>
                                60
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

export default StatsSection;