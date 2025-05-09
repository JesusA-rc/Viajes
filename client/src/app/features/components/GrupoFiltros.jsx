import { Box, Button, useMediaQuery, useTheme } from '@mui/material';
import React, { useContext, useState, useCallback } from 'react';
import SearchBar from './SearchBar';
import ListFilters from './Stats/ListFilters';
import FilterDropdowns from './Stats/FilterDropdowns';
import YearSlider from './Stats/yearSlide';
import { FiltrosContext } from '../contexts/FiltrosContext';

const GrupoFiltros = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [openMenuResponsive, setOpenMenuResponsive] = useState(false);

    const { 
      filtros, 
      setFiltros,
      dropdownFilters,
      listFilters
    } = useContext(FiltrosContext);

    const showMenu = !isMobile || openMenuResponsive;

   const handleListFilterChange = useCallback((filter) => {
        setFiltros(prev => ({ ...prev, estado: filter }));
    }, [setFiltros]);


    const handleDropdownFilterChange = useCallback((filterName, value) => {
        setFiltros(prev => ({ ...prev, [filterName]: value }));
    }, [setFiltros]);

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
                        selectedFilter={filtros.estado}
                        onFilterChange={handleListFilterChange}
                    />

                    <FilterDropdowns
                        filters={dropdownFilters}
                        selectedFilters={{
                          format: filtros.format,
                          genres: filtros.genres,
                          country: filtros.country
                        }}
                        onFilterChange={handleDropdownFilterChange}
                    />

                    <YearSlider 
                        value={filtros.anio}
                        onChange={(newValue) => setFiltros(prev => ({ ...prev, anio: newValue }))}
                    />
                </Box>
            )}
        </Box>
    );
};

export default GrupoFiltros;