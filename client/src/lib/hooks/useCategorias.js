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
            await agent.post('/categorias', nuevaCategoria);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['categorias'] });
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