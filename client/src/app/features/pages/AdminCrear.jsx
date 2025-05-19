import React, { useState } from 'react';
import { Box, Select, MenuItem, FormControl, Typography } from '@mui/material';
import { useDestinoCategoria } from '../../../lib/hooks/useDestinoCategoria';
import CrearRelacionForm from './Admin/Crear/CrearRelacionForm';
import CrearCategoriaForm from './Admin/Crear/CrearCategoriaForm';
import CrearDestinoForm from './Admin/Crear/CrearDestinoForm';
import { toast } from "react-toastify";

const AdminCrear = () => {
  const [selectedOption, setSelectedOption] = useState('Destinos');
  const { createRelacion } = useDestinoCategoria();

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmitRelacion = async (data) => {
    try {
      await createRelacion.mutateAsync({
        iD_Destino: Number(data.iD_Destino),
        iD_Categoria: Number(data.iD_Categoria)
      });

    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', p: 3 }}>
      <FormControl fullWidth sx={{ mb: 3, maxWidth: 300 }}>
        <Select
          value={selectedOption}
          onChange={handleChange}
        >
          <MenuItem value="Destinos">Destinos</MenuItem>
          <MenuItem value="Categorias">Categorias</MenuItem>
          <MenuItem value="CategoriaDestino">Relaciones Destino-Categoría</MenuItem>
        </Select>
      </FormControl>

      {selectedOption === 'CategoriaDestino' && (
        <CrearRelacionForm 
          onSubmit={handleSubmitRelacion} 
          isPending={createRelacion.isPending} 
        />
      )}

      {selectedOption === 'Destinos' && (
        <CrearDestinoForm/>
      )}

      {selectedOption === 'Categorias' && <CrearCategoriaForm />}
    </Box>
  );
};

export default AdminCrear;