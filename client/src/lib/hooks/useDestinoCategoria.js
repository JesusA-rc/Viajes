import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import agent from '../api/agent';
import { toast } from "react-toastify";

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
            try {
                const response = await agent.post('/destinocategoria', nuevaRelacion);
                return response.data;
            } catch (error) {
                if (error.response?.data?.error) {
                    if (Array.isArray(error.response.data.error)) {
                        throw new Error(error.response.data.error.join('\n'));
                    }
                    throw new Error(error.response.data.error);
                }
                throw error;
            }
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['relacionesDestinoCategoria'] });
            toast.success('Relación creada exitosamente!');
        }
    });

    // Eliminar relación
    const deleteRelacion = useMutation({
        mutationFn: async ({ idDestino, idCategoria }) => {
            await agent.delete(`/destinocategoria/${idDestino}/${idCategoria}`);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['relacionesDestinoCategoria'] });

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