import React from 'react';
import { Box, Typography, TextField, Button, Grid, Paper } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useUsuarios } from '../../../../lib/hooks/useUsuarios';
import { useNavigate} from "react-router-dom";
import { loginSchema } from '../../../../lib/schemas/loginSchema';
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from '../../components/TextInput';
import { toast } from 'react-toastify';

const ClienteLogin = () => {
    const navigate = useNavigate();
    const backgroundImage = 'https://img.pikbest.com/backgrounds/20190423/painted-travel-background-for-travel-agency_1808534.jpg!bw700';
  
    const { loginUsuario,} = useUsuarios();

    const { control, handleSubmit, formState: {isValid, isSubmitting} } = useForm({
        mode: 'onTouched',
        resolver: zodResolver(loginSchema) 
    });

  const OnSubmit = async (data) => {
    await loginUsuario.mutateAsync(data,{
      onSuccess: () =>{
          navigate(location.state?.from  || '/clientes/profile')
      },
      onError: () =>{
        toast.error("Credenciales incorrectas.");
      }
    });
  };
  
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

              <TextInput label='Email' control={control} name='email'/>
              <TextInput label='Password' type='password' control={control} name='password'/>
  
              <Button
                type="submit"
                disabled={!isValid || isSubmitting}
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