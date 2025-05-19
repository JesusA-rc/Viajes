import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography, IconButton, Box } from '@mui/material';
import { useDestinos } from '../../../../../lib/hooks/useDestinos';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';

const VerDestinosTable = () => {
  const { destinos, isPending, deleteDestino } = useDestinos();

  if(isPending){
    return <Typography>Cargando destinos...</Typography>
  }

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
          {destinos.map((row) => (
            <TableRow key={row.idDestino}>
              <TableCell>{row.idDestino}</TableCell>
              <TableCell>{row.nombre}</TableCell>
              <TableCell><Box component='img' /></TableCell>
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
