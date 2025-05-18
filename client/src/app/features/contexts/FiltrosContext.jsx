import React, { createContext, useState } from 'react';
import { useCategorias} from '../../../lib/hooks/useCategorias'

export const FiltrosContext = createContext();

export const FiltrosProvider = ({ children }) => {

  const {categorias, isPending} = useCategorias();

  const opcionesCategorias = isPending 
    ? ['All', 'Cargando categorías...'] 
    : ['All', ...(categorias?.map(c => c.nombre) || [])];
    
  const dropdownFilters = [
    {
      name: 'Categorias',
      label: 'Categorias',
      options: opcionesCategorias,
    },
    {
      name: 'country',
      label: 'Country',
      options: ['All', 'México', 'Estados Unidos', 'Canadá', 'Japón'],
    },
  ];

  const listFilters = ['All', 'Visitados', 'Planeados', 'No volvería a ir'];

  const [filtros, setFiltros] = useState({
    estado: 'All',
    format: undefined,
    Categorias: undefined,
    country: undefined,
    anio: [2000, 2023],
    busqueda: ''
  });

  return (
    <FiltrosContext.Provider value={{ 
      filtros, 
      setFiltros,
      dropdownFilters,
      listFilters
    }}>
      {children}
    </FiltrosContext.Provider>
  );
};