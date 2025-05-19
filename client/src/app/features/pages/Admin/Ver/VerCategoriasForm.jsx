import React, {useState} from 'react';
import { useCategorias } from '../../../../../lib/hooks/useCategorias';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography, IconButton,
  TextField
 } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';

const VerCategoriasForm = () => {
  const { categorias, isPending, deleteCategoria } = useCategorias();
  const [filtroId, setFiltroId] = useState('');

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

  const categoriasFiltradas = categorias.filter((destino) =>
    filtroId === '' || destino.idCategoria.toString() === filtroId
  );

  return (
    <Paper>
        <TextField
          label="Filtrar por ID"
          variant="outlined"
          size="small"
          value={filtroId}
          sx={{mt:2,mb:2,ml:2}}
          onChange={(e) => setFiltroId(e.target.value)}
        />

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
          {categoriasFiltradas.map((row) => (
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
