import React from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button, Paper} from '@mui/material';
import { useCategorias } from '../../../../../lib/hooks/useCategorias';

const AdminCategorias = () => {
    const { categorias, isPending, deleteCategoria } = useCategorias();

    const handleDelete = async (idCategoria) => {
        try {
            await deleteCategoria.mutateAsync(idCategoria);
            alert('Categoría eliminada correctamente');
        } catch (error) {
            console.error('Error al eliminar la categoría:', error);
            alert('Ocurrió un error al eliminar la categoría');
        }
    };

    if (isPending) {
        return <Typography>Cargando categorías...</Typography>;
    }

    if (!categorias || categorias.length === 0) {
        return <Typography>No hay categorías disponibles</Typography>;
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h5">Lista de Categorías</Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Descripción</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categorias.map((categoria) => (
                            <TableRow key={categoria.idCategoria}>
                                <TableCell>{categoria.idCategoria}</TableCell>
                                <TableCell>{categoria.nombre}</TableCell>
                                <TableCell>{categoria.descripcion}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => handleDelete(categoria.idCategoria)}
                                    >
                                        Eliminar
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default AdminCategorias;