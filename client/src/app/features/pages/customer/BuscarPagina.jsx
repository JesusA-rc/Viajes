import React, { useContext, useCallback } from 'react';
import { Box, Typography, FormControl } from '@mui/material';
import NavBarCliente from './NavBarCliente';
import SearchBar from '../../components/SearchBar';
import ImageCard from '../../components/Cards/ImageCard';
import { useDestinos } from '../../../../lib/hooks/useDestinos';
import { FiltrosContext } from '../../contexts/FiltrosContext';
import FilterDropdowns from '../../components/Stats/FilterDropdowns';

const BuscarPagina = () => {
  const { destinos, isPending } = useDestinos();
  const { filtros, dropdownFilters, setFiltros } = useContext(FiltrosContext);

  const destinosFiltrados = destinos?.filter(destino => {
    const coincideTexto = !filtros.busqueda || 
      destino.nombre.toLowerCase().includes(filtros.busqueda.toLowerCase());

    const coincideCategoria = !filtros.Categorias || 
      (filtros.Categorias === 'All' || filtros.Categorias == undefined) ||
      destino.categorias?.some(categoria => 
        categoria.nombre === filtros.Categorias
      );

    return coincideTexto && coincideCategoria;
  });

  const handleDropdownFilterChange = useCallback((filterName, value) => {
    setFiltros(prev => ({ ...prev, [filterName]: value }));
  }, [setFiltros]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', backgroundColor: '#222831' }}>
      <NavBarCliente />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, padding: 3 }}>
        <Box sx={{display: 'flex', alignItems:'center', justifyContent:'center', flexWrap: 'wrap'}}>
          <FormControl fullWidth sx={{ mb: 3, maxWidth: 300 }}>
            <SearchBar />
          </FormControl>

          <FilterDropdowns
            filters={dropdownFilters}
            selectedFilters={{
              format: filtros.format,
              Categorias: filtros.Categorias,
              country: filtros.country
            }}
            onFilterChange={handleDropdownFilterChange}
            fDirection='row'
          />
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
          {isPending ? (
            <Typography variant='h6' sx={{ color: 'white', fontWeight: 'bold' }}>
              Cargando destinos...
            </Typography>
          ) : destinosFiltrados?.length > 0 ? (
            destinosFiltrados.map((d) => (
              <ImageCard
                key={d.idDestino}
                image={d.imagen}
                title={d.nombre}
                idDestino={d.idDestino}
              />
            ))
          ) : (
            <Typography variant='h6' sx={{ color: 'white', fontWeight: 'bold' }}>
              No se encontraron destinos que coincidan con los filtros
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default BuscarPagina;