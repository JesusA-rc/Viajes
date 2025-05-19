import { useParams } from "react-router"
import { Box, Button, Divider, ImageList, ImageListItem, Typography } from "@mui/material";
import { useState } from "react";
import PhotoUploadWidget from "./PhotoUploadWidget";
import { useProfile } from "../../../../../lib/hooks/useProfile";

export default function ProfilePhotos() {
    const { id } = useParams();
    
    const { photos, loadingPhotos, isCurrentUser, uploadPhoto, deletePhoto } = useProfile(Number(id)); 
    const [editMode, setEditMode] = useState(false);

    console.log("Fotos del usuario:");
    console.log(photos);

    const handlePhotoUpload = (file) => {
        uploadPhoto.mutate(file, {
            onSuccess: () => {
                setEditMode(false);
            }
        })
    }



    
    const handleDelete = (id) => {
        console.log("id foto" + id);
        deletePhoto.mutate(id);
    };

    if (loadingPhotos) return <Typography>Cargando fotos...</Typography>

    console.log("Current user: " + isCurrentUser);

    if (!photos) return <Typography variant="h5" sx={{color:'white', fontWeight:'bold'}}>No se han encontrado fotos.</Typography>

    return (
        <Box sx={{display:'flex', flexDirection:'column', height: '100%'}}>
            <Box display='flex' justifyContent='space-between'>
                <Typography variant="h5" sx={{color:'white', fontWeight:'bold'}}>Fotos</Typography>
                {isCurrentUser && (
                    <Button onClick={() => setEditMode(!editMode)}>
                        {editMode ? 'Cancel' : 'Add photo'}
                    </Button>)}
            </Box>
            <Divider sx={{ my: 2}} />

            {editMode ? (
                <PhotoUploadWidget
                    uploadPhoto={handlePhotoUpload}
                    loading={uploadPhoto.isPending}
                />
            ) : (
                <>
                    {photos.length === 0 ? (
                        <Typography>No se han agregado fotos</Typography>
                    ) : (
                    <ImageList sx={{ 
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'flex-start',
                        '& .MuiImageListItem-root': {
                            marginBottom: '16px',
                            marginRight: '16px',  
                    }
                    }}>
                    {photos.map((item) => (
                    <ImageListItem 
                        key={item.id} 
                        sx={{
                        width: '200px',
                        height: '200px',
                        overflow: 'hidden',
                        position: 'relative', 
                        '&:hover .delete-button': {
                            opacity: 1 
                        }
                        }}
                    >
                        <img
                        srcSet={`${item.url.replace('/upload/', '/upload/w_200,h_200,c_fill,f_auto,dpr_2,g_face/')}`}
                        src={`${item.url.replace('/upload/', '/upload/w_200,h_200,c_fill,f_auto,g_face/')}`}
                        alt="user profile"
                        loading="lazy"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                            cursor: 'pointer'
                        }}
                        />
                        
                        {isCurrentUser && (
                        <Button
                            className="delete-button"
                            onClick={() => handleDelete(item.id)}
                            variant="contained"
                            color="error"
                            size="small"
                            sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            opacity: 0,
                            transition: 'opacity 0.3s ease',
                            minWidth: 'auto',
                            padding: '4px 8px',
                            '&:hover': {
                                backgroundColor: 'error.dark'
                            }
                            }}
                        >
                            Eliminar
                        </Button>
                        )}
                    </ImageListItem>
                    ))}
                    </ImageList>
                    )}
                </>

            )}
        </Box>


    )
}