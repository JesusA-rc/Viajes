import { useParams } from "react-router"
import { Box, Button, Divider, ImageList, ImageListItem, Typography } from "@mui/material";
import { useState } from "react";
import PhotoUploadWidget from "./PhotoUploadWidget";
import { useProfile } from "../../../../../lib/hooks/useProfile";

export default function ProfilePhotos() {
    const { id } = useParams();
    const { photos, loadingPhotos, isCurrentUser, uploadPhoto,
        profile, setMainPhoto, deletePhoto } = useProfile(id); 
    const [editMode, setEditMode] = useState(false);

    const handlePhotoUpload = (file) => {
        uploadPhoto.mutate(file, {
            onSuccess: () => {
                setEditMode(false);
            }
        })
    }

    console.log("Is current user?: " + isCurrentUser);

    if (loadingPhotos) return <Typography>Cargando fotos...</Typography>

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
                        <ImageListItem key={item.id} sx={{
                            width: '200px',
                            height: '200px',
                            overflow: 'hidden'
                        }}>
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
                                cursor:'pointer'
                            }}
                        />
                        </ImageListItem>
                    ))}
                    </ImageList>
                    )}
                </>

            )}
        </Box>


    )
}