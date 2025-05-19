import { Box, Typography, Button } from '@mui/material'
import { useForm } from 'react-hook-form';
import { toast } from "react-toastify";
import TextInput from '../../../components/TextInput';
import { useDestinos } from '../../../../../lib/hooks/useDestinos';

const CrearDestinoForm = () => {

    const { createDestino} = useDestinos();
    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            Nombre: '',
            Descripcion: '',
            Imagen: '',
            Pais: '',
            Region: ''
        }
    });

      const onSubmit = async (data) => {
          await createDestino.mutateAsync(data);
          toast.success("Categoria creada correctamente.");
          reset();
      };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}
        sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 2, 
            padding: 2,
            maxWidth: 600
      }}
    >

        <TextInput
            name="Nombre"
            control={control}
            label="Nombre"
            rules={{ required: 'Nombre es requerido' }}
            required
        />

        <TextInput
            name="Descripcion" 
            label="Descripción"
            control={control}
            rules={{ required: 'Descripción es requerida' }}
            rows={3}
            required
            multiline
        />

        <TextInput
            name="Imagen" 
            label="Imagen"
            control={control}
            rules={{ required: 'Imagen es requerida' }}
            required
        />

        <TextInput
            name="Pais"
            label="País"
            control={control}
            rules={{ required: 'País es requerido' }}
            required
        />

        <TextInput
            name="Region" 
            label="Región"
            control={control}
            rules={{ required: 'Región es requerida' }}
            required
        />

        <Box sx={{ display: 'flex', gap: 2 }}>
            <Button type="submit" variant="contained" color="primary">
                Crear Destino
            </Button>
            <Button 
                variant="contained" 
                color="error" 
                onClick={() => reset()}
                type="button" 
            >
                Limpiar
            </Button>
        </Box>
    </Box>
  )
}

export default CrearDestinoForm