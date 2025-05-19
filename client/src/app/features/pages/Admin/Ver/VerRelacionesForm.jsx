import React from 'react';
import { useDestinoCategoria } from '../../../../../lib/hooks/useDestinoCategoria';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';


const VerRelacionesForm = () => {
  const { relaciones, isLoadingRelaciones, deleteRelacion } = useDestinoCategoria();

  if (isLoadingRelaciones) {
    return <Typography>Cargando relaciones...</Typography>;
  }

  const handleDelete = (idDestino, idCategoria) => {
    try {
        deleteRelacion.mutate({ idDestino, idCategoria });
        toast.success("relacion borrada correctamente.");
    } catch (error) {
        toast.success("Error: " + error);
    }

  };

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID Destino</TableCell>
            <TableCell>ID Categoría</TableCell>
            <TableCell>nombreCategoria</TableCell>
            <TableCell>nombreDestino</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {relaciones.map((row,index) => (
            <TableRow key={index}>
              <TableCell>{row.iD_Destino}</TableCell>
              <TableCell>{row.iD_Categoria}</TableCell>
              <TableCell>{row.nombreCategoria}</TableCell>
              <TableCell>{row.nombreDestino}</TableCell>
              <TableCell>
                <IconButton
                  onClick={() => handleDelete(row.iD_Destino, row.iD_Categoria)}
                  color="error"
                >
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

export default VerRelacionesForm;
