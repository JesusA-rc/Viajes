import React from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button, Paper, Avatar} from '@mui/material';
import { useDestinos } from '../../../../../lib/hooks/useDestinos';

const AdminDestinos = () => {
    const { destinos, isPending, deleteDestino } = useDestinos();

    const handleDelete = async (idDestinos) => {
        try {
            await deleteDestino.mutateAsync(idDestinos);
            alert('Destino eliminad correctamente');
        } catch (error) {
            console.error('Error al eliminar el destino:', error);
            alert('Ocurrió un error al eliminar el destino');
        }
    };

    if (isPending) {
        return <Typography>Cargando destinos...</Typography>;
    }

    if (!destinos || destinos.length === 0) {
        return <Typography>No hay destinos disponibles</Typography>;
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h5">Lista de destinos</Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Descripción</TableCell>
                            <TableCell>Pais</TableCell>
                            <TableCell>Regiones</TableCell>
                            <TableCell>img</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {destinos.map((destinos, index) => (
                            <TableRow key={destinos.idDestino} 
                            sx={{backgroundColor: index % 2 === 0 ? '#c4c1e0' : '#ffe9e3'}}>
                                <TableCell>{destinos.idDestino}</TableCell>
                                <TableCell>{destinos.nombre}</TableCell>
                                <TableCell>{destinos.descripcion}</TableCell>
                                <TableCell>{destinos.pais}</TableCell>
                                <TableCell>{destinos.region}</TableCell>
                                <TableCell>
                                <Avatar
                                    src={destinos.imagen}
                                    alt={`Imagen de ${destinos.nombre}`}
                                    sx={{ width: 50, height: 50, cursor:'pointer'}}
                                />
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => handleDelete(destinos.idDestino)}
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

export default AdminDestinos;