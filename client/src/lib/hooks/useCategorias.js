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
        mutationFn: async (categoria) => {
            try {
                const response = await agent.put(`/categorias/${categoria.idCategoria}`, categoria);
                return response.data;
            } catch (error) {
                const errorMessage = error.response?.data?.error 
                    || (Array.isArray(error.response?.data?.error)
                    ? error.response.data.error.join('\n') : '') 
                    || error.message;

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
        mutationFn: async (nuevaCategoria) => 
        {
            try 
            {
                const response = await agent.post('/categorias', nuevaCategoria);
                return response.data;
            } 
            catch (error) 
            {
                if (error.response?.data?.error) 
                {
                    if (Array.isArray(error.response.data.error)) 
                    {
                        throw new Error(error.response.data.error.join('\n'));
                    }
                    throw new Error(error.response.data.error);
                }
                throw error;
            }
        },
        onSuccess: async () => 
        {
            await queryClient.invalidateQueries({ queryKey: ['categorias'] });
            alert('Categoría creada exitosamente!');
        },
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
