import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import agent from '../api/agent';
import { toast } from 'react-toastify';

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
      await agent.post('/EstadosDestino', nuevoEstado);
      return nuevoEstado;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['estadosDestino'] });
      toast.success(`✅ ${data.title} guardado correctamente`);
    },
    onError: (error) => {
      console.error('Error al guardar estado:', error);
      toast.error(`❌ Error al guardar el estado: ${error.message}`);
    }
  });

  const updateEstado = useMutation({
    mutationFn: async ({ id, estado, title }) => {
      const response = await agent.put(`/EstadosDestino/${id}`, { estado });
      return { data: response.data, estado, id, title };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['estadosDestino'] });
            toast.success(`✅ "${data.title}" actualizado a: ${data.estado}`);
    },
    onError: (error) => {
      console.error('Error al actualizar estado:', error);
      toast.error(`❌ Error al actualizar el estado: ${error.message}`);
    }
  });

  const deleteEstado = useMutation({
    mutationFn: async (id) => {
      await agent.delete(`/EstadosDestino/${id}`);
      toast.success(`✅ Destino eliminado correctamente.`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['estadosDestino'] });
    },
    onError: () => {
      toast.error(`❌ Ocurrio un error`);
    }
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