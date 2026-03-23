import { Paper, Typography } from '@mui/material';
import { useDestinoCategoriaPagination } from '../../../../../lib/hooks/useDestinoCategoria';
import { toast } from 'react-toastify';
import DataTable from '../../../components/DataTable';

const VerRelacionesForm = () => 
{
  const { 
    relaciones, 
    pagination, 
    isLoading, 
    handlePageChange, 
    handleLimitChange, 
    deleteRelacion } = useDestinoCategoriaPagination();

  const handleDelete = (item) => 
  {
    deleteRelacion.mutate({ idDestino: item.iD_Destino, idCategoria: item.iD_Categoria }, {
      onSuccess: () => {
        toast.success("Relación borrada correctamente.");
      },
      onError: (error) => {
        toast.error("Error: " + error);
      }
    });
  };

  const columns = [
    { header: 'ID Destino', accessor: 'iD_Destino' },
    { header: 'ID Categoría', accessor: 'iD_Categoria' },
    { header: 'Nombre Categoría', accessor: 'nombreCategoria' },
    { header: 'Nombre Destino', accessor: 'nombreDestino' }
  ];

  if (isLoading && (!relaciones || !relaciones.length)) {
    return <Typography>Cargando relaciones...</Typography>;
  }

  return (
    <Paper sx={{ p: 2 }}>
      <DataTable
        columns={columns}
        data={relaciones}
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

export default VerRelacionesForm;
