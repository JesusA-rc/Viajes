import { Box, Typography, Avatar } from '@mui/material';
import { useDestinosPagination } from '../../../../../lib/hooks/useDestinos';
import DataTable from '../../../components/DataTable';

const AdminDestinos = () => 
{
    const { 
        destinos, 
        pagination, 
        isLoading, 
        handlePageChange, 
        handleLimitChange, 
        deleteDestino } = useDestinosPagination();

    const handleDelete = async (item) => 
    {
        try 
        {
            await deleteDestino.mutateAsync(item.idDestino);
            alert('Destino eliminado correctamente');
        } 
        catch (error) 
        {
            console.error('Error al eliminar el destino:', error);
            alert('Ocurrió un error al eliminar el destino');
        }
    };

    const columns = [
        { header: 'ID', accessor: 'idDestino' },
        { header: 'Nombre', accessor: 'nombre' },
        { header: 'Descripción', accessor: 'descripcion' },
        { header: 'País', accessor: 'pais' },
        { header: 'Región', accessor: 'region' },
        { 
            header: 'Imagen', 
            accessor: 'imagen',
            render: (value, row) => (
                <Avatar
                    src={value}
                    alt={`Imagen de ${row.nombre}`}
                    sx={{ width: 50, height: 50 }}
                />
            )
        }
    ];

    if (isLoading && !destinos.length) {
        return <Typography>Cargando destinos...</Typography>;
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 4 }}>
            <Typography variant="h5">Lista de Destinos</Typography>

            <DataTable 
                columns={columns} 
                data={destinos || []} 
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
        </Box>
    );
};

export default AdminDestinos;
