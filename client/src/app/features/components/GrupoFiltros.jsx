import { Box, Button, useMediaQuery, useTheme } from '@mui/material';
import React, { useState } from 'react';
import SearchBar from './SearchBar';
import ListFilters from './Stats/ListFilters';
import FilterDropdowns from './Stats/FilterDropdowns';
import YearSlider from './Stats/yearSlide';

const GrupoFiltros = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [openMenuResponsive, setOpenMenuResponsive] = useState(false);

    const showMenu = !isMobile || openMenuResponsive;

    const listFilters = ['All', 'Visitados', 'Planeados', 'No volvería a ir'];

    const dropdownFilters = [
        {
            name: 'Format',
            options: ['All', 'Experiencias', 'Parques', 'Museos', 'Zoológicos'],
        },
        {
            name: 'Genres',
            options: ['All', 'Aventura', 'Cultura', 'Naturaleza', 'Ciudad', 'Playa'],
        },
        {
            name: 'Country',
            options: ['All', 'México', 'Estados Unidos', 'Canadá', 'Japón'],
        },
    ];

    const [selectedFilter, setSelectedFilter] = useState('All');
    const [selectedDropdownFilters, setSelectedDropdownFilters] = useState({
        Format: undefined,
        Genres: undefined,
        Country: undefined,
    });

    const handleListFilterChange = (filter) => {
        setSelectedFilter(filter);
    };

    const handleDropdownFilterChange = (filterName, value) => {
        setSelectedDropdownFilters({ ...selectedDropdownFilters, [filterName]: value });
    };


    return (
        <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            bgcolor: '#393e46', 
            p: 2, 
            borderRadius: 1, 
            gap: 2, 
            width: '100%'
        }}>
            <SearchBar />

            {isMobile && (
                <Button
                    variant="contained"
                    onClick={() => setOpenMenuResponsive(!openMenuResponsive)}
                    sx={{
                        backgroundColor: '#00adb5',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: '#008b94',
                        },
                    }}
                >
                    {openMenuResponsive ? 'Ocultar Filtros' : 'Mostrar Filtros'}
                </Button>
            )}


            {showMenu && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <ListFilters
                        filters={listFilters}
                        selectedFilter={selectedFilter}
                        onFilterChange={handleListFilterChange}
                    />

                    <FilterDropdowns
                        filters={dropdownFilters}
                        selectedFilters={selectedDropdownFilters}
                        onFilterChange={handleDropdownFilterChange}
                    />

                    <YearSlider />
                </Box>
            )}
        </Box>
    );
};

export default GrupoFiltros;