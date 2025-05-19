import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import agent from "../api/agent"
import { useNavigate } from 'react-router';
import { useMemo } from "react";
import { toast } from "react-toastify";

export const useProfile = (id) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { data: profile, isLoading: loadingProfile } = useQuery({
        queryKey: ['profile', id],
        queryFn: async () => {
            const response = await agent.get(`/profiles/${id}`);
            return response.data
        },
        enabled: !!id
    })

    const {data: photos, isLoading: loadingPhotos} = useQuery({
        queryKey: ['photos', id],
        queryFn: async () => {
            const response = await agent.get(`/profiles/${id}/photos`);
            return response.data;
        },
        enabled: !!id
    });

    const uploadPhoto = useMutation({
        mutationFn: async (file) => {
            const formData = new FormData();
            formData.append('file', file);
            const response = await agent.post('/profiles/add-photo', formData, {
                headers: {'Content-Type': 'multipart/form-data'}
            });
            return response.data;
        },
        onSuccess: async (photo) => {
            await queryClient.invalidateQueries({
                queryKey: ['photos', id]
            });
            queryClient.setQueryData(['user'], (data) => {
                if (!data) return data;
                return {
                    ...data,
                    imageUrl: data.imageUrl ?? photo.url
                }
            });
            queryClient.setQueryData(['profile', id], (data) => {
                if (!data) return data;
                return {
                    ...data,
                    imageUrl: data.imageUrl ?? photo.url
                }
            });
        }
    })

    const setMainPhoto = useMutation({
        mutationFn: async (photo) => {
            await agent.put(`/profiles/${photo.id}/setMain`)
        },
        onSuccess: (_, photo) => {
            queryClient.setQueryData(['user'], (userData) => {
                if (!userData) return userData;
                return {
                    ...userData,
                    imageUrl: photo.url
                }
            });
            queryClient.setQueryData(['profile', id], (profile) => {
                if (!profile) return profile;
                return {
                    ...profile,
                    imageUrl: photo.url
                }
            })
        }
    })

    const deletePhoto = useMutation({
    mutationFn: async (photoId) => {
        await agent.delete(`/profiles/${photoId}/photos`);
    },
    onSuccess: (_, photoId) => {

        queryClient.setQueryData(['photos', id], (photos) => {
        return photos?.filter(x => x.id !== photoId);
        });
        

        toast.success('Foto eliminada correctamente', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    },
    onError: (error, photoId, context) => {

        queryClient.setQueryData(['photos', id], context.previousPhotos);
        

        toast.error(`Error al eliminar foto: ${error.message}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    },
    onMutate: async (photoId) => {

        await queryClient.cancelQueries(['photos', id]);
        const previousPhotos = queryClient.getQueryData(['photos', id]);

        queryClient.setQueryData(['photos', id], (old) => {
        return old?.filter(x => x.id !== photoId);
        });
        
        return { previousPhotos };
    }
    });

    const logoutUser = useMutation({
        mutationFn: async () =>{
            await agent.post('/account/logout');
        },
        onSuccess: () =>{
            queryClient.removeQueries({queryKey: ['usuarioActual']});
            navigate('/company');
        }
    });

    const loginUsuario = useMutation({
        mutationFn: async (creds) => {
            await agent.post('/login?useCookies=true', creds);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['usuarioActual']
            });
        }
    });

    const {data: currentUser, isLoading: loadingUserInfo} = useQuery({
        queryKey: ['usuarioActual'],
        queryFn: async () => {
            const response = await agent.get('/account/user-info');
            return response.data;
        },
        enabled: !queryClient.getQueryData(['usuarioActual']) && 
        location.pathname !== 'login' &&
        location.pathname !== '/register'
    });

    const isCurrentUser = useMemo(() => {
        return id === queryClient.getQueryData(['usuarioActual'])?.id
    }, [id, queryClient])

    return {
        profile,
        loadingProfile,
        photos,
        loadingPhotos,
        isCurrentUser,
        uploadPhoto,
        setMainPhoto,
        deletePhoto,
        currentUser,
        loadingUserInfo,
        logoutUser,
        loginUsuario
    }
}
