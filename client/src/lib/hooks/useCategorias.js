import { useMutation, useQuery, useQueryClient }  from '@tanstack/react-query'
import agent from '../api/agent'

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
        mutationFn: async (categoria) =>{
            await agent.put(`/categorias/${categoria.idCategoria}`, categoria)
        },
        onSuccess:  async () =>{
            await queryClient.invalidateQueries({
                queryKey: ['categorias']
            })
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