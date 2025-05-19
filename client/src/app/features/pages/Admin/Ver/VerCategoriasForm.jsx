import React from 'react';
import { useCategorias } from '../../../../../lib/hooks/useCategorias';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';

const VerCategoriasForm = () => {
  const { categorias, isPending, deleteCategoria } = useCategorias();

  if (isPending) {
    return <Typography>Cargando categorías...</Typography>;
  }

  const handleDelete = (id) => {
    try {
        deleteCategoria.mutate(id);
        toast.success("Categoria borrada correctamente.");
    } catch (error) {
        toast.success("Error: " + error);
    }

  };

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Descripcion</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categorias.map((row) => (
            <TableRow key={row.idCategoria}>
              <TableCell>{row.idCategoria}</TableCell>
              <TableCell>{row.nombre}</TableCell>
              <TableCell>{row.descripcion}</TableCell>
                <TableCell>
                <IconButton onClick={() => handleDelete(row.idCategoria)} color="error">
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

export default VerCategoriasForm;
