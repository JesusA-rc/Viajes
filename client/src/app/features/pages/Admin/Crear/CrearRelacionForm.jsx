import React from 'react';
import { Box, Button } from '@mui/material';
import TextInput from '../../../components/TextInput'
import { useForm } from 'react-hook-form';

const CrearRelacionForm = ({ onSubmit, isPending }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      iD_Destino: '',
      iD_Categoria: ''
    }
  });

  return (
    <Box 
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: 'flex', flexDirection: 'column', maxWidth: 600 }}
    >
      <TextInput 
        name="iD_Destino" 
        label="ID Destino" 
        control={control} 
        rules={{ 
          required: 'ID Destino es requerido',
          pattern: {
            value: /^[0-9]+$/,
            message: 'Solo números permitidos'
          }
        }}
        sx={{ mb: 2 }}
      />

      <TextInput 
        name="iD_Categoria" 
        label="ID Categoría" 
        control={control} 
        rules={{ 
          required: 'ID Categoría es requerido',
          pattern: {
            value: /^[0-9]+$/,
            message: 'Solo números permitidos'
          }
        }}
        sx={{ mb: 2 }}
      />

      <Button 
        type="submit" 
        variant="contained" 
        color="primary"
        sx={{ mt: 2 }}
        disabled={isPending}
      >
        {isPending ? 'Creando...' : 'Crear Relación'}
      </Button>
    </Box>
  );
};

export default CrearRelacionForm;