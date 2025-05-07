import React, { useState } from 'react';
import { Slider, Button, Typography, Box } from '@mui/material';

const YearSlider = () => {
    const [value, setValue] = useState(1980);
    const [isDragged, setIsDragged] = useState(false);

    const handleChangeValue = (newValue) => {
        setValue(newValue);
        if (newValue === 1980) {
            setIsDragged(false);
        } else {
            setIsDragged(true);
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '40px', 
                    visibility: isDragged ? 'visible' : 'hidden', 
                }}
            >
                <Button onClick={() => handleChangeValue(1980)} sx={{ ml: 2 }}>X</Button>
                <Typography sx={{ ml: 2 }}>{value}</Typography>
            </Box>

            <Slider
                value={value}
                onChange={(event, newValue) => handleChangeValue(newValue)}
                min={1980}
                max={2023}
                step={1}
                marks
                valueLabelDisplay="auto"
                sx={{ width: '100%', maxWidth: '300px' }} 
            />
        </Box>
    );
};

export default YearSlider;