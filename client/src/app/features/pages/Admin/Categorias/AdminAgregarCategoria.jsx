import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useCategorias } from '../../../../../lib/hooks/useCategorias';

const AdminAgregarCategoria = () => {
    const { register, handleSubmit, reset } = useForm();
    const { createCategoria } = useCategorias();

    const onSubmit = async (data) => {
        try {
            await createCategoria.mutateAsync(data);
            alert('Categoría creada correctamente');
            reset(); 
        } catch (error) {
            console.error('Error al crear la categoría:', error);
            alert('Ocurrió un error al crear la categoría');
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h5">Agregar Categoría</Typography>

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

            <Button type="submit" variant="contained" color="primary">
                Crear Categoría
            </Button>
            <Button variant="contained" color="error" onClick={()=>reset()}>
                Limpiar
            </Button>
        </Box>
    );
};

export default AdminAgregarCategoria;