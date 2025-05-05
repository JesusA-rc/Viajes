import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import styles from '../../../css/Grid2Column.module.css';
import { useUsuarios } from '../../../../lib/hooks/useUsuarios';
import { useForm } from 'react-hook-form';

const ClienteRegister = () => {
  const { createUsuario } = useUsuarios();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }, 
  } = useForm();

  const onSubmit = async (data) => {
    console.log('Datos enviados:', data); 
    try {
      await createUsuario.mutateAsync(data);
      alert('Usuario creado correctamente');
      reset();
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      alert('Ocurrió un error al crear el usuario');
    }
  };

  return (
    <Box
      className={styles.grid2}
      sx={{
        backgroundColor: '#e3e3e3',
        display: 'flex',
        padding: 10,
        maxHeight: '100vh',
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        className={styles.gridLeft}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <Typography variant="h3" sx={{ mb: 4 }}>
          Empiece ahora
        </Typography>

        <NameCamp
          nameCamp="Nombre"
          register={register}
          required="El nombre es obligatorio"
          error={errors.nombre?.message} 
        />
        <NameCamp
          nameCamp="Email"
          register={register}
          required="El Email es obligatorio"
          pattern={{
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Ingrese un Email válido',
          }}
          error={errors.correo?.message}
        />
        <NameCamp
          nameCamp="Contraseña"
          register={register}
          required="La contraseña es obligatoria"
          minLength={{
            value: 6,
            message: 'La contraseña debe tener al menos 6 caracteres',
          }}
          error={errors.contraseña?.message}
        />

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 5 }}>
          <Button type="submit" variant="contained" sx={{ width: '50%' }}>
            Registrarse
          </Button>
        </Box>
      </Box>

      <Box className={styles.gridRight} sx={{ width: '100%', height: '100%' }}>
        <img
          src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGZpcnN0JTIwY29tcGFueXxlbnwwfHx8fDE2ODQ5NTY1MjA&ixlib=rb-4.0.3&q=80&w=1080"
          alt=""
        />
      </Box>
    </Box>
  );
};

export const NameCamp = ({ nameCamp, register, required, pattern, minLength, error }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h5" fontWeight="bold">
        {nameCamp}
      </Typography>
      <TextField
        label={`Ingrese ${nameCamp.toLowerCase()}`}
        variant="outlined"
        fullWidth
        size="small"
        {...register(nameCamp.toLowerCase(), { required, pattern, minLength })} 
        error={!!error} 
        helperText={error} 
      />
    </Box>
  );
};

export default ClienteRegister;