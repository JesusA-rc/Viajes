import { useCategoriasPagination } from '../../../../../lib/hooks/useCategorias';
import { Paper, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import DataTable from '../../../components/DataTable';

const VerCategoriasForm = () => 
{
  const {
    categorias,
    pagination,
    isLoading,
    handlePageChange,
    handleLimitChange,
    deleteCategoria
  } = useCategoriasPagination();

  const handleDelete = (item) => 
  {
    deleteCategoria.mutate(item.idCategoria, {
      onSuccess: () => {
        toast.success("Categoría borrada correctamente.");
      },
      onError: (error) => {
        toast.error("Error al eliminar categoría: " + error.message);
      }
    });
  };

  const handleEdit = (item) => {
    console.log("Editar:", item);
  };

  const columns = [
    { header: 'ID', accessor: 'idCategoria' },
    { header: 'Nombre', accessor: 'nombre' },
    { header: 'Descripción', accessor: 'descripcion' }
  ];

  if (isLoading && !categorias.length) {
    return <Typography>Cargando categorías...</Typography>;
  }

  return (
    <Paper sx={{ p: 2 }}>
      <DataTable
        columns={columns}
        data={categorias}
        pagination={{
          page: pagination.page,
          limit: pagination.limit,
          totalItems: pagination.totalItems,
          onPageChange: handlePageChange,
          onLimitChange: handleLimitChange,
          isFetching: isLoading
        }}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </Paper>
  );
};

export default VerCategoriasForm;