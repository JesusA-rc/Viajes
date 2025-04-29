import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, TextField, Typography, Select, MenuItem, FormControl, InputLabel} from '@mui/material';
import { useCategorias } from '../../../../../lib/hooks/useCategorias';

const AdminEditarCategoria = () => {
    const { register, handleSubmit, setValue, reset } = useForm();
    const { categorias, isPending, updateCategoria } = useCategorias();

    const [selectedId, setSelectedId] = React.useState('');

    const handleIdChange = (event) => {
        const id = event.target.value;
        setSelectedId(id);

        const selectedCategoria = categorias?.find((cat) => cat.idCategoria === parseInt(id, 10));
        if (selectedCategoria) {
            setValue('nombre', selectedCategoria.nombre);
            setValue('descripcion', selectedCategoria.descripcion);
        }
    };

    const onSubmit = async (data) => {
        try {
            await updateCategoria.mutateAsync({
                idCategoria: parseInt(selectedId, 10),
                nombre: data.nombre,
                descripcion: data.descripcion,
            });
            alert('Categoría actualizada correctamente');
            reset();
        } catch (error) {
            console.error('Error al actualizar la categoría:', error);
            alert('Ocurrió un error al actualizar la categoría');
        }
    };

    if (isPending) {
        return <Typography>Cargando...</Typography>;
    }

    if (!categorias || categorias.length === 0) {
        return <Typography>No hay categorías disponibles</Typography>;
    }

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h5">Editar Categoría</Typography>

            <InputLabel id="categoria-select-label">Seleccionar Categoría</InputLabel>
            <FormControl fullWidth>
                <Select
                    labelId="categoria-select-label"
                    value={selectedId}
                    onChange={handleIdChange}
                    fullWidth
                    required
                >
                    {categorias.map((categoria) => (
                        <MenuItem key={categoria.idCategoria} value={categoria.idCategoria}>
                            {categoria.idCategoria} - {categoria.nombre}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <InputLabel>Nombre</InputLabel>
            <TextField
                {...register('nombre')}
                fullWidth
                required
            />

            <InputLabel>Descripcion</InputLabel>
            <TextField
                {...register('descripcion')}
                fullWidth
                multiline
                rows={3}
                required
            />

            <Button type='submit' variant='contained' color='primary' disabled={!selectedId}>
                Guardar Cambios
            </Button>
            <Button variant="contained" color="error" onClick={()=>reset()}>
                Limpiar
            </Button>
        </Box>
    );
};

export default AdminEditarCategoria;