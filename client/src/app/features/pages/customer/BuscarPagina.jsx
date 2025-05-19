import React, { useContext, useCallback } from 'react';
import { Box, Typography, FormControl } from '@mui/material';
import NavBarCliente from './NavBarCliente';
import SearchBar from '../../components/SearchBar';
import ImageCard from '../../components/Cards/ImageCard';
import { useDestinos } from '../../../../lib/hooks/useDestinos';
import { FiltrosContext } from '../../contexts/FiltrosContext';
import FilterDropdowns from '../../components/Stats/FilterDropdowns';
import { useGetEstadosByUsuarioId } from '../../../../lib/hooks/useEstadosDestino';
import { useProfile } from '../../../../lib/hooks/useProfile';

const BuscarPagina = () => {
  const { currentUser, loadingUserInfo } = useProfile();
  const { data: estadosUsuario, isLoading: isLoadingEstados } = useGetEstadosByUsuarioId(
    !loadingUserInfo && currentUser ? currentUser.id : null
  );

  const { destinosConCategorias, isPendingConCategorias } = useDestinos();

  const { filtros, dropdownFilters, setFiltros } = useContext(FiltrosContext);

  const handleDropdownFilterChange = useCallback((filterName, value) => {
    setFiltros(prev => ({ ...prev, [filterName]: value }));
  }, [setFiltros]);

  if (loadingUserInfo || !currentUser) {
    return <Typography>Cargando...</Typography>;
  }



  const destinosCombinados = destinosConCategorias?.map(destino => {
    const estadoUsuario = estadosUsuario?.find(e => e.destinoId === destino.idDestino);
    return {
        ...destino,
        estadoUsuario: estadoUsuario || null
      };
  });



  const destinosFiltrados = destinosCombinados?.filter(destino => {
    const coincideTexto = !filtros.busqueda || 
      destino.nombre.toLowerCase().includes(filtros.busqueda.toLowerCase());

    const coincideCategoria = !filtros.Categorias || 
      (filtros.Categorias === 'All' || filtros.Categorias == undefined) ||
      destino.categorias?.some(categoria => 
        categoria.nombre === filtros.Categorias
      );

    return coincideTexto && coincideCategoria;
  });

  console.log(destinosFiltrados);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', backgroundColor: '#222831', minHeight:'100vh' }}>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, padding: 3 }}>
        <Box sx={{display: 'flex', alignItems:'center', justifyContent:'center', flexWrap: 'wrap'}}>
          <FormControl fullWidth sx={{ mb: 3, maxWidth: '50%' }}>
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
          {(isPendingConCategorias || isLoadingEstados) ?  (
            <Typography variant='h6' sx={{ color: 'white', fontWeight: 'bold' }}>
              Cargando destinos...
            </Typography>
          ) : destinosFiltrados?.length > 0 ? (
            destinosFiltrados.map((d) => (
              <ImageCard
                key={d.idDestino}
                image={d.imagen}
                title={d.nombre}
                destinoId = {d.idDestino}
                estadoUsuario={d.estadoUsuario}
                usuarioId = {currentUser.id}
                destino ={d}
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