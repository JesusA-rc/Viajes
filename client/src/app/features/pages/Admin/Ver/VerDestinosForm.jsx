import React, {useState} from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography, IconButton, Box,
  TextField
 } from '@mui/material';
import { useDestinos } from '../../../../../lib/hooks/useDestinos';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';

const VerDestinosTable = () => {
  const { destinos, isPending, deleteDestino } = useDestinos();
  const [filtroId, setFiltroId] = useState('');

  if(isPending){
    return <Typography>Cargando destinos...</Typography>
  }

  const destinosFiltrados = destinos.filter((destino) =>
    filtroId === '' || destino.idDestino.toString() === filtroId
  );

  const handleDelete = (id) => {
    try {
        deleteDestino.mutate(id);
        toast.success("Destino borrado");
    } catch (error) {
        toast.error("Error: " + error);
    }
    deleteDestino.mutate(id);
  };

  return (
    <Paper>
      <TextField
        label="Filtrar por ID de destino"
        variant="outlined"
        size="small"
        value={filtroId}
        onChange={(e) => setFiltroId(e.target.value)}
        sx={{ mb: 2,mt: 2, ml:2 }}
      />

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Imagen</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {destinosFiltrados.map((row) => (
            <TableRow key={row.idDestino}>
              <TableCell>{row.idDestino}</TableCell>
              <TableCell>{row.nombre}</TableCell>
              <TableCell>
                  <Box
                    component="img"
                    src={row.imagen} 
                    alt={row.nombre}
                    sx={{ width: 100, height: 50, objectFit: 'cover', borderRadius: 1 }}
                  />
              </TableCell>
              <TableCell>{row.descripcion}</TableCell>
               <TableCell>
                <IconButton onClick={() => handleDelete(row.idDestino)} color="error">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default VerDestinosTable;
