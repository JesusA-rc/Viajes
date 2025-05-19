import { useMutation, useQuery, useQueryClient }  from '@tanstack/react-query'
import agent from '../api/agent'
import { toast } from "react-toastify";

export const useCategorias = () =>{
    const queryClient = useQueryClient();

    const {data: categorias, isPending} = useQuery({
        queryKey: ['categorias'],
        queryFn: async () =>{
            const response = await agent.get('/categorias/');
            return response.data;
        }
    });

    const updateCategoria = useMutation({
        mutationFn: async (categoria) => {
            try {
                const response = await agent.put(`/categorias/${categoria.idCategoria}`, categoria);
                return response.data;
            } catch (error) {
                const errorMessage = error.response?.data?.error ||
                                    (Array.isArray(error.response?.data?.error)
                                    ? error.response.data.error.join('\n')
                                    : '') ||
                                    error.message;

                throw new Error(errorMessage);
            }
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['categorias'] });
            toast.success("Categoría actualizada correctamente");
        },
        onError: (error) => {
            toast.error("Error al actualizar: " + error.message);
        }
    });


    const createCategoria = useMutation({
        mutationFn: async (nuevaCategoria) => {
            try {
                const response = await agent.post('/categorias', nuevaCategoria);
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
            await queryClient.invalidateQueries({ queryKey: ['categorias'] });
            alert('Categoría creada exitosamente!');
        },
    });

    const deleteCategoria = useMutation({
        mutationFn: async (idCategoria) => {
            await agent.delete(`/categorias/${idCategoria}`);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['categorias'] });
        },
    });

    return{
        categorias,
        isPending,
        updateCategoria,
        createCategoria,
        deleteCategoria
    };
}