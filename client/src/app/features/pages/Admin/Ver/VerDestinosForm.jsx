import { Box, Paper, Typography } from '@mui/material';
import { useDestinosPagination } from '../../../../../lib/hooks/useDestinos';
import { toast } from 'react-toastify';
import DataTable from '../../../components/DataTable';

const VerDestinosTable = () => 
{
  const { 
    destinos, 
    pagination, 
    isLoading, 
    handlePageChange, 
    handleLimitChange, 
    deleteDestino } = useDestinosPagination();

  const handleDelete = (item) => 
  {
    deleteDestino.mutate(item.idDestino, {
      onSuccess: () => {
        toast.success("Destino borrado");
      },
      onError: (error) => {
        toast.error("Error al borrar: " + error);
      }
    });
  };

  const columns = [
    { header: 'ID', accessor: 'idDestino' },
    { header: 'Nombre', accessor: 'nombre' },
    { 
      header: 'Imagen', 
      accessor: 'imagen',
      render: (value, row) => (
        <Box
          component="img"
          src={value} 
          alt={row.nombre}
          sx={{ width: 100, height: 50, objectFit: 'cover', borderRadius: 1 }}
        />
      )
    },
    { header: 'Descripción', accessor: 'descripcion' }
  ];

  if (isLoading && (!destinos || !destinos.length)) {
    return <Typography>Cargando destinos...</Typography>
  }

  return (
    <Paper sx={{ p: 2 }}>
      <DataTable
        columns={columns}
        data={destinos}
        onDelete={handleDelete}
        pagination={{
          page: pagination.page,
          limit: pagination.limit,
          totalItems: pagination.totalItems,
          onPageChange: handlePageChange,
          onLimitChange: handleLimitChange,
          isFetching: isLoading
        }}
      />
    </Paper>
  );
};

export default VerDestinosTable;
