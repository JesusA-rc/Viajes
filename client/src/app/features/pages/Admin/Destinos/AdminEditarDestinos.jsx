import React from 'react'
import { useDestinos } from '../../../../../lib/hooks/useDestinos';
import { useForm } from 'react-hook-form';
import { Box, Typography, InputLabel, FormControl, Select, MenuItem, TextField, Button } from '@mui/material';

const AdminEditarDestinos = () => {
    const { register, handleSubmit, setValue, reset } = useForm();
    const { destinos, isPending, updateDestino } = useDestinos();

    const [selectedId, setSelectedId] = React.useState('');

    const handleIdChange = (event) => {
        const id = event.target.value;
        setSelectedId(id);

        const selectedDestino = destinos?.find((d) => d.idDestino === parseInt(id, 10));
        if (selectedDestino) {
            setValue('nombre', selectedDestino.nombre);
            setValue('descripcion', selectedDestino.descripcion);
            setValue('imagen',selectedDestino.imagen);
            setValue('pais',selectedDestino.pais);
            setValue('region', selectedDestino.region);
        }
    };

    const onSubmit = async (data) => {
        try {
            await updateDestino.mutateAsync({
                idDestino: parseInt(selectedId, 10),
                nombre: data.nombre,
                descripcion: data.descripcion,
                imagen: data.imagen,
                pais: data.pais,
                region: data.region
            });
            reset();
        } catch (error) {
            console.error('Error al actualizar el destino:', error);
        }
    };

    if (isPending) {
        return <Typography>Cargando...</Typography>;
    }

    if (!destinos || destinos.length === 0) {
        return <Typography>No hay categorías disponibles</Typography>;
    }

  return (
    <Box component='form' onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding:10 }}>
        <Typography variant="h5">Editar Destino</Typography>

        <InputLabel id="destino-select-label">Seleccionar Destino</InputLabel>
        <FormControl fullWidth>
            <Select
                labelId="destino-select-label"
                value={selectedId}
                onChange={handleIdChange}
                fullWidth
                required
            >
                {destinos.map((destino) => (
                    <MenuItem key={destino.idDestino} value={destino.idDestino}>
                        {destino.idDestino} - {destino.nombre}
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
            required
            multiline rows={3}
        />

        <InputLabel>Imagen</InputLabel>
        <TextField 
            {...register('imagen')}
            fullWidth
            required
        />

        <InputLabel>Pais</InputLabel>
        <TextField 
            {...register('pais')}
            fullWidth
            required
        />

        <InputLabel>Region</InputLabel>
        <TextField 
            {...register('region')}
            fullWidth
            required
        />

        <Button type='submit' variant='contained' color='primary' disabled={!selectedId} sx={{mb: 2}}>
            Guardar cambios
        </Button>
        <Button variant="contained" color="error" onClick={()=>reset()}>
            Limpiar
        </Button>
    </Box>

  )
}

export default AdminEditarDestinos