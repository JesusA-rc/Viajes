import { Box, Typography } from '@mui/material';
import { useCategoriasPagination } from '../../../../../lib/hooks/useCategorias';
import DataTable from '../../../components/DataTable';

const AdminCategorias = () => 
{
    const {
        categorias,
        pagination, 
        isLoading, 
        handlePageChange, 
        handleLimitChange, 
        deleteCategoria } = useCategoriasPagination();
    
    const handleDelete = async (item) =>
    {
        try 
        {
            await deleteCategoria.mutateAsync(item.idCategoria);
            alert('Categoría eliminada correctamente');
        }
        catch (error)
        {
            console.error('Error al eliminar la categoría:', error);
            alert('Ocurrió un error al eliminar la categoría');
        }
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
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 4 }}>
            <Typography variant="h5">Lista de Categorías</Typography>

            <DataTable 
                columns={columns} 
                data={categorias || []} 
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

export default AdminCategorias;