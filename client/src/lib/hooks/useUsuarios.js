import { useMutation, useQuery, useQueryClient }  from '@tanstack/react-query'
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import agent from '../api/agent'

export const useUsuarios = () => {

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const loginUsuario = useMutation({
        mutationFn: async (creds) => {
            await agent.post('/login?useCookies=true', creds);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['usuarios']
            });
        }
    });

    const {data: usuarios, isPending} = useQuery({
        queryKey: ['usuarios'],
        queryFn: async () =>{
            const response = await agent.get('/usuarios/')
            return response.data;
        }
    });

    const createUsuario = useMutation({
        mutationFn: async (nuevoUsuario) => {
            await agent.post('/account/register', nuevoUsuario);
        },
        onSuccess: () => {
            toast.success('Registro exitoso - ahora puedes iniciar sesión');
            navigate('/clientes/login');
        },
        onError: (error) => {
            const errors = error.response?.data;
            toast.error('Hubo un error al registrarte');
            return errors.data;
        }
    });

    const {data: currentUser, isLoading: loadingUserInfo} = useQuery({
        queryKey: ['usuariose'],
        queryFn: async () => {
            const response = await agent.get('/account/user-info');
            return response.data;
        },
        enabled: !queryClient.getQueryData(['usuarios']) && 
        location.pathname !== 'login' &&
        location.pathname !== '/register'
    });

    const logoutUser = useMutation({
        mutationFn: async () =>{
            await agent.post('/account/logout');
        },
        onSuccess: () =>{
            queryClient.removeQueries({queryKey: ['usuarios']});
            navigate('/company');
        }
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




    return{
        usuarios,
        isPending,
        createUsuario,
        deleteUsuario,
        updateUsuario,
        loginUsuario,
        currentUser,
        loadingUserInfo,   
        logoutUser
    }

}


export function useGetFavoritos(usuarioId) {
  return useQuery({
    queryKey: ['favoritos', usuarioId],
    queryFn: async () => {
      const response = await agent.get(`/usuarios/favoritos/${usuarioId}`);
      if (response.data?.message === "El usuario no tiene destinos favoritos") {
        return [];
      }
      return response.data;
    },
    enabled: !!usuarioId,
    staleTime: 5 * 60 * 1000, 
    cacheTime: 10 * 60 * 1000, 
  });
}