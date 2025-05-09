import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import agent from '../api/agent';

export function useEstadosDestino() {
  const queryClient = useQueryClient();

  const { data: estadosDestino, isPending: isLoadingAll } = useQuery({
    queryKey: ['estadosDestino'],
    queryFn: async () => {
      const response = await agent.get('/EstadosDestino');
      return response.data; 
    },
  });
  

  const createEstado = useMutation({
    mutationFn: async (nuevoEstado) => {
      const response = await agent.post('/EstadosDestino', nuevoEstado);
      return response.data; 
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['estadosDestino'] });
    },
  });

  const updateEstado = useMutation({
    mutationFn: async (estadoActualizado) => {
      const response = await agent.put(`/EstadosDestino/${estadoActualizado.id}`, estadoActualizado);
      return response.data; 
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['estadosDestino'] }); 
    },
  });

  const deleteEstado = useMutation({
    mutationFn: async (id) => {
      await agent.delete(`/EstadosDestino/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['estadosDestino'] });
    },
  });

  return {
    estadosDestino,
    isLoadingAll,
    createEstado,
    updateEstado,
    deleteEstado,
  };
}


export function useGetEstadosByEstado(estado) {
  return useQuery({
    queryKey: ['estadosDestino', 'estado', estado],
    queryFn: async () => {
      const response = await agent.get(`/EstadosDestino/estado/${estado}`);
      return response.data;
    },
    enabled: !!estado, 
  });
}

export function useGetEstadosByUsuarioId(usuarioId) {
  return useQuery({
    queryKey: ['estadosDestino', 'usuario', usuarioId],
    queryFn: async () => {
      const response = await agent.get(`/EstadosDestino/usuario/${usuarioId}`);
      return response.data; 
    },
    enabled: !!usuarioId, 
  });
}

export function useGetEstadosByDestinoId(destinoId) {
  return useQuery({
    queryKey: ['estadosDestino', 'destino', destinoId],
    queryFn: async () => {
      const response = await agent.get(`/EstadosDestino/destino/${destinoId}`);
      return response.data; 
    },
    enabled: !!destinoId, 
  });
}