import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Tooltip, Modal,TextField,Select,MenuItem,FormControl,InputLabel,Button,
Slider
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useEstadosDestino } from '../../../../lib/hooks/useEstadosDestino' 
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useFavoritosUsuario } from '../../../../lib/hooks/useFavoritosUsuario';
import { useNavigate } from 'react-router';
import FavoritoButton from '../buttons/FavoritoButton';


const ImageCard = ({estadoUsuario, usuarioId, destino}) => {

  const [isHovered, setIsHovered] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [estado, setEstado] = useState('');
  const [calificacion, setCalificacion] = useState(5);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const { isFavorito, addFavorito, removeFavorito } = useFavoritosUsuario(usuarioId);
  const navigate = useNavigate();

  const estados = ['Visitados', 'Planeados', 'No volvería a ir'];
  const { updateEstado, deleteEstado } = useEstadosDestino();
  const { createEstado } = useEstadosDestino();

  useEffect(() => {
    if (estadoUsuario) {
      setEstado(estadoUsuario.estado);
      setCalificacion(estadoUsuario.calificacion || 5);
    }else
      setEstado('');
  }, [estadoUsuario, openModal]);

  const handleOpenModal = () => {
    setOpenModal(true);

  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSubmit = () => {
    if (estadoUsuario && estadoUsuario.id) {
      updateEstado.mutate({ id: estadoUsuario.id, estado, title: destino.nombre });
    } else {
      createEstado.mutate({ UsuarioId: usuarioId, DestinoId: destino.idDestino, Estado: estado, title:destino.nombre });
    }

    handleCloseModal();
  };

  const handleNavigateDestinos = (idDestino) =>{
    navigate(`/clientes/destinos/${idDestino}`);
  }

  const handleToggleFavorito = async () => {
    try {
      if (isFavorito(destino.idDestino)) {
        await removeFavorito({ 
          usuarioId: usuarioId, 
          destinoId: destino.idDestino
        });
      } else {
        await addFavorito({ 
          UsuarioId: usuarioId, 
          DestinoId: destino.idDestino
        });
      }
    } catch (error) {
      console.error("Error en favoritos:", error);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>

      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'center',
          gap: 2,
          width: 190,
          borderRadius: 5,
          overflow: 'hidden',
          cursor: 'pointer'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}

      >
        <Box
          component="img"
          sx={{
            height: 255,
            width: '100%',
            borderRadius: 5,
            position: 'relative',
          }}
          alt={destino.nombre}
          src={destino.imagen}
          onClick={() =>handleNavigateDestinos(destino.idDestino)}
        />

        {isHovered && (
          <Tooltip title="Editar">
            <IconButton
              onClick={handleOpenModal}
              sx={{
                position: 'absolute',
                bottom: 46,
                right: 8,
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.9)',
                },
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        )}

        <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 'bold' }}>
          {destino.nombre}
        </Typography>
      </Box>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-editar-destino"
        aria-describedby="modal-editar-destino"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 700,
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          bgcolor:'#352f44',
          color: 'white'
        }}>
          <Box sx={{display:'flex', justifyContent:'space-between'}}>
            <Box sx={{display:'flex', gap: 2,  alignItems:'center'}}>
              <Box 
                component='img'
                src={destino.imagen}  
                alt={`Imagen de ${destino.nombre}`}  
                sx={{
                  width: 125, 
                  height: 175, 
                  objectFit: 'cover', 
                }}
              />
              <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                { destino.nombre}
              </Typography>
            </Box>

            <Box sx={{display:'flex', alignItems:'center', gap:2}}>
                  <FavoritoButton
                      isFavorito={isFavorito(destino.idDestino)}
                      onToggle={handleToggleFavorito}
                  />
              <Button onClick={handleSubmit} variant="contained" color="primary" disabled={estado==''}>
                Guardar
              </Button>
            </Box>

          </Box>

          <FormControl fullWidth sx={{ mb: 3, mt: 3 }}>
            <InputLabel id="estado-label" sx={{color:'white'}}>Estado</InputLabel>
            <Select
              labelId="estado-label"
              value={estado}
              label="Estado"
              onChange={(e) => setEstado(e.target.value)}
              sx={{color:'white'}}
            >
              {estados.map((estado) => (
                <MenuItem key={estado} value={estado} >
                  {estado}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ mb: 3 }}>
            <Typography id="calificacion-label" gutterBottom>
              Calificación (1-10)
            </Typography>
            <Slider
              value={calificacion}
              onChange={(e, newValue) => setCalificacion(newValue)}
              aria-labelledby="calificacion-label"
              step={1}
              marks
              min={1}
              max={10}
              valueLabelDisplay="auto"
            />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button onClick={handleCloseModal} variant="outlined">
              Cancelar
            </Button>

           {estadoUsuario && (
            <Button
              onClick={() => setOpenConfirmDialog(true)}
              variant="contained"
              color="error"
            >
              Eliminar
            </Button>
          )}
          </Box>

        </Box>
      </Modal>


      <Dialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"¿Estás seguro de eliminar este estado?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Esta acción no se puede deshacer. El destino será eliminado de tu lista.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDialog(false)} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={() => {
              deleteEstado.mutate(estadoUsuario.id);
              handleCloseModal();
              setOpenConfirmDialog(false);
            }}
            color="error"
            variant="contained"
            autoFocus
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>


    </Box>
  );
};

export default ImageCard;