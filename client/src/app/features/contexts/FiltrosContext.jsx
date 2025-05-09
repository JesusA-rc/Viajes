import React, { createContext, useState } from 'react';

export const FiltrosContext = createContext();

export const FiltrosProvider = ({ children }) => {
    
  const dropdownFilters = [
    {
      name: 'format',
      label: 'Format',
      options: ['All', 'Experiencias', 'Parques', 'Museos', 'Zoológicos', 'Ciudades Historicas', 'Playas tropicales', 'Acuarios'],
    },
    {
      name: 'Categorias',
      label: 'Categorias',
      options: ['All', 'Ciudades Historicas', 'Playas tropicales', 'Acuarios'],
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
    format: 'All',
    Categorias: 'All',
    country: 'All',
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