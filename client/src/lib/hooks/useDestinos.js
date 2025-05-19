import { useMutation, useQuery, useQueryClient }  from '@tanstack/react-query'
import { toast } from 'react-toastify';
import agent from '../api/agent'

export const useDestinos = () => {
    const queryClient = useQueryClient();

    const {data: destinos, isPending} = useQuery({
        queryKey: ['destinos'],
        queryFn: async () =>{
            const response = await agent.get('/destinos/')
            return response.data;
        }
    });

    const { data: destinosConCategorias, isPending: isPendingConCategorias } = useQuery({
        queryKey: ['destinos', 'with-categories'],
        queryFn: async () => {
            const response = await agent.get('/destinos/with-categories');
            return response.data;
        }
    });

    const createDestino = useMutation({
        mutationFn: async (nuevoDestino) => {
            try {
                const response = await agent.post('/destinos', nuevoDestino);
                return response.data;
            } catch (error) {
                const errorMessage = error.response?.data?.error || 
                                error.response?.data?.error.join('\n') || 
                                error.message;
                
                if (Array.isArray(errorMessage)) {
                    throw new Error(errorMessage.join('\n'));
                }
                throw new Error(errorMessage);
            }
        },
        onSuccess: async () => {
            toast.success("Destino agregado correctamente");
            await queryClient.invalidateQueries({ queryKey: ['destinos'] });
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    const updateDestino = useMutation({
        mutationFn: async (actualizarDestino) =>{
            await agent.put(`/destinos/${actualizarDestino.idDestino}`,actualizarDestino);
        },
        onSuccess: async () =>{
            await queryClient.invalidateQueries({ queryKey: ['destinos'] });
        },
    });

    const deleteDestino = useMutation({
        mutationFn: async (idDestino) => {
            await agent.delete(`/destinos/${idDestino}`);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['destinos'] });
        },
    });

    return {
        destinos,
        isPending,
        createDestino,
        deleteDestino,
        updateDestino,
        destinosConCategorias, 
        isPendingConCategorias, 
    };
}


export function useDestinoByID(id) {
  return useQuery({
    queryKey: ['destino', id],
    queryFn: async () => {
      const { data } = await agent.get(`/destinos/${id}`);
      return data;
    },
    enabled: !!id, 
    staleTime: 1000 * 60 * 5, 
    retry: (failureCount, error) => {
      if (error.response?.status === 404) return false;
      return failureCount < 3; 
    }
  });
}