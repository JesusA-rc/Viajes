import { useMutation, useQuery, useQueryClient }  from '@tanstack/react-query'
import agent from '../api/agent'
import { useCallback } from 'react';

export const useUsuarios = () => {

    const queryClient = useQueryClient();

    const {data: usuarios, isPending} = useQuery({
        queryKey: ['usuarios'],
        queryFn: async () =>{
            const response = await agent.get('/usuarios/')
            return response.data;
        }
    });

    const getFavoritos = useCallback(async (usuarioId) => {
        try {
        const response = await agent.get(`/usuarios/favoritos/${usuarioId}`);
        return response.data?.message === "El usuario no tiene destinos favoritos" 
            ? [] 
            : response.data;
        } catch (error) {
        if (error.response?.status === 404) return [];
        throw error;
        }
    }, []); 

    const createUsuario =  useMutation({
        mutationFn: async (nuevoUsuario) =>{
            await agent.post('/usuarios', nuevoUsuario);
        },
        onSuccess: async () =>{
            await queryClient.invalidateQueries({ queryKey: ['usuarios'] });
        },
    });

    const updateUsuario = useMutation({
        mutationFn: async (actualizarUsuario) =>{
            await agent.put(`/usuarios/${actualizarUsuario.idDestino}`,actualizarUsuario);
        },
        onSuccess: async () =>{
            await queryClient.invalidateQueries({ queryKey: ['usuario'] });
        },
    });

    const deleteUsuario = useMutation({
        mutationFn: async (idUsuario) => {
            await agent.delete(`/usuarios/${idUsuario}`);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['usuarios'] });
        },
    });

    const loginUsuario = useMutation({
        mutationFn: async (credenciales) => {
          const response = await agent.post('/usuarios/login', credenciales);
          return response.data;
        },
        onSuccess: (data) => {
          if (data.isAuthenticated) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.userId);
            console.log('Datos del login:', data);
          }
        },
        onError: (error) => {
          console.error('Error al iniciar sesión:', error);
        },
    });

    return{
        usuarios,
        isPending,
        createUsuario,
        deleteUsuario,
        updateUsuario,
        loginUsuario,
        getFavoritos
    }

}