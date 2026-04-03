import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import agent from '../api/agent';
import { toast } from "react-toastify";

export const useDestinoCategoria = () => 
{
    const queryClient = useQueryClient();

    const { data: relaciones, isPending: isLoadingRelaciones } = useQuery({
        queryKey: ['relacionesDestinoCategoria'],
        queryFn: async () => {
            const response = await agent.get('/destinocategoria');
            return response.data;
        }
    });

    const createRelacion = useMutation({
        mutationFn: (nuevaRelacion) => agent.post('/destinocategoria', nuevaRelacion).then(res => res.data),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['relacionesDestinoCategoria'] });
            toast.success('Relación creada exitosamente!');
        },
        onError: (error) => {
            const message = Array.isArray(error) ? error.join('\n') : error.message;
            toast.error(message);
        }
    });

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

export const useDestinoCategoriaPagination = () => {
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
        queryKey: ['relacionesDestinoCategoria', 'pagination', paginationState],
        queryFn: () => agent.get('/destinocategoria/pagination', {
            params: paginationState
        }).then(res => res.data),
        keepPreviousData: true,
        staleTime: 30 * 1000
    });

    const handlePageChange = (newPage) => {
        if (!isPreviousData && paginatedData?.totalPages && newPage <= paginatedData.totalPages) {
            setPaginationState(prev => ({
                ...prev,
                page: newPage
            }));
        }
    };

    const handleLimitChange = (newLimit) => {
        setPaginationState(prev => ({
            ...prev,
            limit: newLimit,
            page: 1
        }));
    };

    const deleteRelacion = useMutation({
        mutationFn: async ({ idDestino, idCategoria }) => {
            await agent.delete(`/destinocategoria/${idDestino}/${idCategoria}`);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['relacionesDestinoCategoria'] });
            await queryClient.invalidateQueries({ queryKey: ['relacionesDestinoCategoria', 'pagination'] });
        },
    });

    return {
        relaciones: paginatedData?.items || [],
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
        handleLimitChange,
        deleteRelacion
    };
};