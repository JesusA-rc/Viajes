import React, {useState} from 'react';
import { useDestinoCategoria } from '../../../../../lib/hooks/useDestinoCategoria';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography, IconButton, Box,
  TextField
 } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';


const VerRelacionesForm = () => {
  const { relaciones, isLoadingRelaciones, deleteRelacion } = useDestinoCategoria();
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [filtroDestino, setFiltroDestino] = useState('');

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

  const relacionesFiltradas = relaciones.filter((row) => {
    const categoriaMatch = !filtroCategoria || row.iD_Categoria.toString() === filtroCategoria;
    const destinoMatch = !filtroDestino || row.iD_Destino.toString() === filtroDestino;
    return categoriaMatch && destinoMatch;
  });

  return (
    <Paper>
      <Box display="flex" gap={2} p={2}>
        <TextField
          label="Filtrar por Destino"
          value={filtroDestino}
          onChange={(e) => setFiltroDestino(e.target.value)}
          variant="outlined"
          size="small"
        />
        <TextField
          label="Filtrar por Categoría"
          value={filtroCategoria}
          onChange={(e) => setFiltroCategoria(e.target.value)}
          variant="outlined"
          size="small"
        />
      </Box>
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
          {relacionesFiltradas.map((row,index) => (
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
