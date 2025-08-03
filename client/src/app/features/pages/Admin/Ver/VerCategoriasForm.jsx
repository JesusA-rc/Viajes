import React, { useState } from 'react';
import { useCategoriasPagination } from '../../../../../lib/hooks/useCategorias';
import { Paper, Typography, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import DataTable from '../../../components/DataTable';
import DeleteIcon from '@mui/icons-material/Delete';

const VerCategoriasForm = () => {
  const [filtroId, setFiltroId] = useState('');
  
  // Usa solo el hook de paginación
  const { 
    categorias, 
    pagination, 
    isLoading,
    handlePageChange,
    handleLimitChange, // Asegúrate que tu hook devuelva esta función
    deleteCategoria
  } = useCategoriasPagination(filtroId);

  console.log('Categorias:', categorias);

  const handleDelete = async (id) => {
    try {
      await deleteCategoria(id);
      toast.success("Categoría borrada correctamente.");
    } catch (error) {
      toast.error("Error al eliminar categoría: " + error.message);
    }
  };

  const columns = [
    { header: 'ID', accessor: 'idCategoria' },
    { header: 'Nombre', accessor: 'nombre' },
    { header: 'Descripción', accessor: 'descripcion' }
  ];

  const actions = [
    {
      type: 'delete',
      onClick: (item) => handleDelete(item.idCategoria),
      icon: <DeleteIcon fontSize="small" />,
      tooltip: 'Eliminar categoría'
    }
  ];

  if (isLoading && !categorias.length) {
    return <Typography>Cargando categorías...</Typography>;
  }

  return (
    <Paper sx={{ p: 2 }}>
      <TextField
        label="Filtrar por ID"
        variant="outlined"
        size="small"
        value={filtroId}
        sx={{ mb: 2 }}
        onChange={(e) => setFiltroId(e.target.value)}
        disabled={isLoading}
      />

      <DataTable
        columns={columns}
        data={categorias}
        actions={actions}
        pagination={{
          page: pagination.page,
          limit: pagination.limit,
          totalItems: pagination.totalItems,
          onPageChange: handlePageChange,
          onLimitChange: handleLimitChange, // ¡Asegúrate de pasar esta función!
          isFetching: isLoading
        }}
      />
    </Paper>
  );
};

export default VerCategoriasForm;