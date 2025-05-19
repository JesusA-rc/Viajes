import React, { useState } from 'react';
import { Box, FormControl, MenuItem, Select } from '@mui/material';
import VerDestinosForm from './Ver/VerDestinosForm'
import VerCategoriasForm from './Ver/VerCategoriasForm';
import VerRelacionesForm from './Ver/VerRelacionesForm';

const AdminVer = () => {
  const [selectedOption, setSelectedOption] = useState('Destinos');

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', p: 3 }}>
      <FormControl fullWidth sx={{ mb: 3, maxWidth: 300 }}>
        <Select value={selectedOption} onChange={handleChange}>
          <MenuItem value="Destinos">Destinos</MenuItem>
          <MenuItem value="Categorias">Categorias</MenuItem>
          <MenuItem value="CategoriaDestino">Relaciones Destino-Categoría</MenuItem>
        </Select>
      </FormControl>

      {selectedOption === 'Destinos' && <VerDestinosForm />}
      {selectedOption === 'Categorias' && <VerCategoriasForm/>}
      {selectedOption === 'CategoriaDestino' && <VerRelacionesForm/>}

    </Box>
  );
};

export default AdminVer;
