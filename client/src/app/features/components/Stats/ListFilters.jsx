import React from 'react';
import { Box, Typography } from '@mui/material';

const ListFilters = ({ filters, selectedFilter, onFilterChange }) => {
    return (
        <Box sx={{ backgroundColor: '#222831', padding: 2 }}>
            <Typography variant="subtitle1" sx={{ color: 'white', fontSize: '0.8rem', fontWeight: 'bold' }}>
                Lists
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {filters.map((filter) => (
                    <Typography
                        key={filter}
                        variant="body1"
                        sx={{
                            color: selectedFilter === filter ? 'primary.main' : 'white',
                            cursor: 'pointer',
                            '&:hover': {
                                textDecoration: 'underline',
                            },
                        }}
                        onClick={() => onFilterChange(filter)}
                    >
                        {filter}
                    </Typography>
                ))}
            </Box>
        </Box>
    );
};

export default ListFilters;