import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import agent from '../api/agent';

export const useDestinoCategoria = () => {
    const queryClient = useQueryClient();

    // Obtener todas las relaciones
    const { data: relaciones, isPending: isLoadingRelaciones } = useQuery({
        queryKey: ['relacionesDestinoCategoria'],
        queryFn: async () => {
            const response = await agent.get('/destinocategoria');
            return response.data;
        }
    });

    // Crear nueva relación
    const createRelacion = useMutation({
        mutationFn: async (nuevaRelacion) => {
            await agent.post('/destinocategoria', nuevaRelacion);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['relacionesDestinoCategoria'] });
            // También invalidar las queries específicas por destino si es necesario
        },
    });

    // Eliminar relación
    const deleteRelacion = useMutation({
        mutationFn: async ({ idDestino, idCategoria }) => {
            await agent.delete(`/destinocategoria/${idDestino}/${idCategoria}`);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['relacionesDestinoCategoria'] });
            // Invalidar también las queries de categorías por destino
        },
    });

    return {
        relaciones,
        isLoadingRelaciones,
        createRelacion,
        deleteRelacion
    };
};

export const useGetCategoriasByDestino = (idDestino) => useQuery({
        queryKey: ['categoriasDestino', idDestino],
        queryFn: async () => {
            const response = await agent.get(`/destinocategoria/destino/${idDestino}`);
            return response.data;
        },
        enabled: !!idDestino
});