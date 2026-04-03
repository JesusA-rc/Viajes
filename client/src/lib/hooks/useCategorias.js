import { useMutation, useQuery, useQueryClient }  from '@tanstack/react-query'
import { useState } from 'react';
import agent from '../api/agent'
import { toast } from "react-toastify";

export const useCategorias = () =>
{
    const queryClient = useQueryClient();

    const {data: categorias, isPending} = useQuery({
        queryKey: ['categorias'],
        queryFn: async () =>{
            const response = await agent.get('/categorias/');
            return response.data;
        }
    });

    const updateCategoria = useMutation({
        mutationFn: (categoria) => agent.put(`/categorias/${categoria.idCategoria}`, categoria).then(res => res.data),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['categorias'] });
            toast.success("Categoría actualizada correctamente");
        },
        onError: (error) => {
            const message = Array.isArray(error) ? error.join('\n') : error.message;
            toast.error("Error al actualizar: " + message);
        }
    });

    const createCategoria = useMutation({
        mutationFn: (nuevaCategoria) => agent.post('/categorias', nuevaCategoria).then(res => res.data),
        onSuccess: async () => 
        {
            await queryClient.invalidateQueries({ queryKey: ['categorias'] });
            toast.success('Categoría creada exitosamente!');
        },
        onError: (error) => {
            const message = Array.isArray(error) ? error.join('\n') : error.message;
            toast.error(message);
        }
    });

    const deleteCategoria = useMutation({
        mutationFn: async (idCategoria) => 
        {
            await agent.delete(`/categorias/${idCategoria}`);
        },
        onSuccess: async () => 
        {
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

export const useCategoriasPagination = () => 
{
    const queryClient = useQueryClient();
    const [paginationState, setPaginationState] = useState({
        page: 1,
        limit: 10
    });

    const { 
        data: paginatedData, 
        isLoading, 
        isFetching, 
        isPreviousData 
    } = useQuery({
        queryKey: ['categorias', 'pagination', paginationState],
        queryFn: () => agent.get('/categorias/pagination', {
            params: paginationState
        }).then(res => res.data),
        keepPreviousData: true,
        staleTime: 30 * 1000
    });

    const handlePageChange = (newPage) => 
    {
        if (!isPreviousData && paginatedData?.totalPages && newPage <= paginatedData.totalPages) 
        {
            setPaginationState(prev => ({
                ...prev,
                page: newPage
            }));
        }
    };

    const handleLimitChange = (newLimit) => 
    {
        setPaginationState(prev => ({
            ...prev,
            limit: newLimit,
            page: 1
        }));
    };

    const invalidatePagination = () => {
        queryClient.invalidateQueries(['categorias', 'pagination']);
    };

    const deleteCategoria = useMutation({
        mutationFn: async (idCategoria) => {
            await agent.delete(`/categorias/${idCategoria}`);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['categorias'] });
            await queryClient.invalidateQueries({ queryKey: ['categorias', 'pagination'] });
        },
    });

    return {
        categorias: paginatedData?.items || [],
        pagination: {
            page: paginatedData?.page || 1,
            limit: paginatedData?.limit || 10,
            totalItems: paginatedData?.totalItems || 0,
            totalPages: paginatedData?.totalPages || 1
        },
        isLoading,
        isFetching,
        isPreviousData,
        handlePageChange,
        invalidatePagination,
        deleteCategoria,
        handleLimitChange, 
    }; 
}; 
