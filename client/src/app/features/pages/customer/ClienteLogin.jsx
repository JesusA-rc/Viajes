import React from 'react';
import { Box, Typography, TextField, Button, Grid, Paper } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useUsuarios } from '../../../../lib/hooks/useUsuarios';

const ClienteLogin = () => {
    const backgroundImage = 'https://img.pikbest.com/backgrounds/20190423/painted-travel-background-for-travel-agency_1808534.jpg!bw700';
  
    const { loginUsuario } = useUsuarios();

    const OnSubmit = async (data) => {
        try {
            await loginUsuario.mutateAsync(data);
            alert('Inicio de sesión exitoso');
            reset();
        } catch (error) {
            alert(`Credenciales incorrectas ${data.email} PASS ${data.password}`);
            console.error('Error al iniciar sesión:', error);
        }
    };

    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm();

  
  
    return (
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            width: '100%',
            maxWidth: 400,
            borderRadius: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Iniciar Sesión
          </Typography>
  
          <Box component="form" onSubmit={handleSubmit(OnSubmit)} noValidate sx={{ mt: 2 }}>

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo Electrónico"
              name="email"
              autoComplete="email"
              autoFocus
              {...register('email', {
                required: 'El correo electrónico es obligatorio',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Ingrese un correo electrónico válido',
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    border: 'none',
                  },
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main',
                  },
                },
                '& .MuiOutlinedInput-input': {
                  borderBottom: '0.5px solid gray',
                },
              }}
            />
  
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register('password', {
                required: 'La contraseña es obligatoria',
                minLength: {
                  value: 6,
                  message: 'La contraseña debe tener al menos 6 caracteres',
                },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    border: 'none',
                  },
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main',
                  },
                },
                '& .MuiOutlinedInput-input': {
                  borderBottom: '0.5px solid gray',
                },
              }}
            />
  
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: '#ff0000' }}
            >
              Iniciar Sesión
            </Button>
          </Box>
        </Paper>
      </Box>
    );
  };
  
  export default ClienteLogin;