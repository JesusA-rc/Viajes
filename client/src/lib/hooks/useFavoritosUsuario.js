import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import agent from '../api/agent';
import { toast } from 'react-toastify';

export const useFavoritosUsuario = (usuarioId) => {
  const queryClient = useQueryClient();

  const { data: favoritos, isLoading, error,refetch } = useQuery({
    queryKey: ['favoritos', usuarioId],
    queryFn: async () => {
      const { data } = await agent.get(`/favoritos/${usuarioId}`);
      return data;
    },
    enabled: !!usuarioId,
    staleTime: 0 
  });

  const { mutate: addFavorito } = useMutation({
    mutationFn: async ({ UsuarioId, DestinoId }) => {
      const { data } = await agent.post('/favoritos', { 
        UsuarioId, 
        DestinoId 
      });
      return data;
    },
    onMutate: async (newFavorito) => {
      await queryClient.cancelQueries(['favoritos', usuarioId]);
      
      // valor anterior
      const previousFavoritos = queryClient.getQueryData(['favoritos', usuarioId]);
      
      // Actualización optimista
      queryClient.setQueryData(['favoritos', usuarioId], old => [
        ...(old || []),
        { destinoId: newFavorito.DestinoId }
      ]);
      
      return { previousFavoritos };
    },
    onError: (err, newFavorito, context) => {
      // Revertir en caso de error
      queryClient.setQueryData(['favoritos', usuarioId], context.previousFavoritos);
      toast.error('Error al agregar favorito');
    },
    onSettled: () => {
      // Recargar datos para asegurar sincronización
      queryClient.invalidateQueries(['favoritos', usuarioId]);
      toast.success("Destino agregado a favoritos correctamente.");
    }
  });

  const { mutate: removeFavorito } = useMutation({
    mutationFn: async ({ usuarioId, destinoId }) => {
      await agent.delete(`/favoritos/${usuarioId}/${destinoId}`);
    },
    onMutate: async ({ destinoId }) => {
      await queryClient.cancelQueries(['favoritos', usuarioId]);
      
      const previousFavoritos = queryClient.getQueryData(['favoritos', usuarioId]);
      
      queryClient.setQueryData(['favoritos', usuarioId], old => 
        old?.filter(fav => fav.destinoId !== destinoId));
      
      return { previousFavoritos };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(['favoritos', usuarioId], context.previousFavoritos);
      toast.error('Error al eliminar favorito');
    },
    onSettled: () => {
      queryClient.invalidateQueries(['favoritos', usuarioId]);
        toast.success("Destino removido de favoritos.");
    }
  });

  const isFavorito = (destinoId) => {
    return favoritos?.some(fav => fav.destinoId === destinoId) || false;
  };

  return {
    favoritos,
    isLoading,
    error,
    isFavorito,
    addFavorito,
    removeFavorito,
    refetchFavoritos: refetch
  };
};