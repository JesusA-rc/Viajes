import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useCategorias } from '../../../../../lib/hooks/useCategorias'
import TextInput from '../../../components/TextInput';

const CrearCategoriaForm = () => {
  const { createCategoria } = useCategorias();
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      nombre: '',
      descripcion: ''
    }
  });

  const onSubmit = async (data) => {
    try {
      await createCategoria.mutateAsync(data);
      reset();
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit(onSubmit)} 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 2, 
        padding: 2,
        maxWidth: 600
      }}
    >
      <Typography variant="h5">Agregar Categoría</Typography>

      <TextInput
        name="nombre"
        label="Nombre"
        control={control}
        rules={{ required: 'Nombre es requerido' }}
        fullWidth
      />

      <TextInput
        name="descripcion"
        label="Descripción"
        control={control}
        rules={{ required: 'Descripción es requerida' }}
        fullWidth
        multiline
        rows={3}
      />

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button 
          type="submit" 
          variant="contained" 
          color="primary"
          disabled={createCategoria.isPending}
        >
          {createCategoria.isPending ? 'Creando...' : 'Crear Categoría'}
        </Button>
        
        <Button 
          variant="contained" 
          color="error" 
          onClick={() => reset()}
          disabled={createCategoria.isPending}
        >
          Limpiar
        </Button>
      </Box>
    </Box>
  );
};

export default CrearCategoriaForm;