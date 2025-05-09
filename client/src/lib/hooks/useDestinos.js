import { useMutation, useQuery, useQueryClient }  from '@tanstack/react-query'
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

    const createDestino =  useMutation({
        mutationFn: async (nuevoDestino) =>{
            await agent.post('/destinos', nuevoDestino);
        },
        onSuccess: async () =>{
            await queryClient.invalidateQueries({ queryKey: ['destinos'] });
        },
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
        updateDestino
    };
}

