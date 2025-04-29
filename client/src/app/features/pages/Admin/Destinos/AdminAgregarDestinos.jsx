import React from 'react'
import { useDestinos } from '../../../../../lib/hooks/useDestinos'
import { useForm } from 'react-hook-form';
import { Box, Typography, TextField, Button } from '@mui/material';

const AdminAgregarDestinos = () => {

    const { register, handleSubmit, reset } = useForm();
    const { createDestino } = useDestinos();

    const onSubmit = async (data) => {
      try {
          await createDestino.mutateAsync(data);
          alert('Destino creado correctamente');
          reset(); 
      } catch (error) {
          console.error('Error al crear el destino:', error);
          alert('Ocurrió un error al crear el destino');
      }
  };

  return (
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h5">Agregar Destino</Typography>

        <TextField
            label="Nombre"
            {...register('nombre')}
            fullWidth
            required
        />

        <TextField
            label="Descripción"
            {...register('descripcion')}
            fullWidth
            multiline
            rows={3}
            required
        />

        <TextField
            label="Imagen"
            {...register('imagen')}
            fullWidth
            required
        />

        <TextField
            label="Pais"
            {...register('pais')}
            fullWidth
            required
        />

        <TextField
            label="Region"
            {...register('region')}
            fullWidth
            required
        />

        <Button type="submit" variant="contained" color="primary">
            Crear Destino
        </Button>

        <Button variant="contained" color="error" onClick={()=>reset()}>
            Limpiar
        </Button>
    </Box>
  )
}

export default AdminAgregarDestinos