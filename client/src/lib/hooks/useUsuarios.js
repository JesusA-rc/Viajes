import { useMutation, useQuery, useQueryClient }  from '@tanstack/react-query'
import agent from '../api/agent'


export const useUsuarios = () => {

    const queryClient = useQueryClient();

    const {data: usuarios, isPending} = useQuery({
        queryKey: ['usuarios'],
        queryFn: async () =>{
            const response = await agent.get('/usuarios/')
            return response.data;
        }
    });

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
            localStorage.setItem('token', data.token);
            console.log('Inicio de sesión exitoso:', data);
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
        loginUsuario
    }

}