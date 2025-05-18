import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import styles from '../../../css/Grid2Column.module.css';
import { useUsuarios } from '../../../../lib/hooks/useUsuarios';
import { useForm } from 'react-hook-form';
import TextInput from '../../components/TextInput';

const ClienteRegister = () => {
  const { createUsuario } = useUsuarios();
  const { control , handleSubmit, setError, formState: {isValid, isSubmitting} } = useForm();

  const onSubmit = async (data) => {
        await createUsuario.mutateAsync(data, {
        onError: (error) => {
        const errors = error.response?.data;

          if (Array.isArray(errors)) {
            errors.forEach(err => {
              if (err.includes("Correo")) {
                setError("email", { message: err });
              } else if (err.includes("contraseña") || err.includes("Password")) {
                setError("password", { message: err });
              } else if (err.includes("Nombre")) {
                setError("nombre", { message: err });
              }
            });
          }
        }
        });
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


        <TextInput label='Nombre' control={control} name='nombre'/>
        <TextInput label='Email' control={control} name='email'/>
        <TextInput label='Password' type='password' control={control} name='password'/>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 5 }}>
          <Button type="submit" variant="contained" sx={{ width: '50%' }} disabled={!isValid || isSubmitting}>
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