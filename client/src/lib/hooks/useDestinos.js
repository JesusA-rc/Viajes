import { useMutation, useQuery, useQueryClient }  from '@tanstack/react-query'
import { useState } from 'react';
import { toast } from "react-toastify";

import agent from '../api/agent'

export const useDestinos = () => 
{
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
        mutationFn: (nuevoDestino) => agent.post('/destinos', nuevoDestino).then(res => res.data),
        onSuccess: async () => {
            toast.success("Destino agregado correctamente");
            await queryClient.invalidateQueries({ queryKey: ['destinos'] });
        },
        onError: (error) => {
            const message = Array.isArray(error) ? error.join('\n') : error.message;
            toast.error(message);
        }
    });

    const updateDestino = useMutation({
        mutationFn: (actualizarDestino) => 
            agent.put(`/destinos/${actualizarDestino.idDestino}`, actualizarDestino).then(res => res.data),
        onSuccess: async () => {
            toast.success("Destino actualizado correctamente");
            await queryClient.invalidateQueries({ queryKey: ['destinos'] });
        },
        onError: (error) => {
            const message = Array.isArray(error) ? error.join('\n') : error.message;
            toast.error(message);
        }
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

export const useDestinosPagination = () => 
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
        queryKey: ['destinos', 'pagination', paginationState],
        queryFn: () => agent.get('/destinos/pagination', {
            params: paginationState
        }).then(res => res.data),
        keepPreviousData: true,
        staleTime: 30 * 1000
    });

    const handlePageChange = (newPage) => {
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

    const deleteDestino = useMutation({
        mutationFn: async (idDestino) => {
            await agent.delete(`/destinos/${idDestino}`);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['destinos'] });
            await queryClient.invalidateQueries({ queryKey: ['destinos', 'pagination'] });
        },
    });

    return {
        destinos: paginatedData?.items || [],
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
        deleteDestino
    };
};