import { 
  Box, 
  TableContainer, 
  Table, 
  TableHead, 
  TableCell, 
  TableRow, 
  TableBody, 
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  CircularProgress
} from '@mui/material';
import React, { useState } from 'react';
import { useDestinos } from '../../../../lib/hooks/useDestinos';
import { useCategorias } from '../../../../lib/hooks/useCategorias';
import { useDestinoCategoria } from '../../../../lib/hooks/useDestinoCategoria';

const AdminVer = () => {
  const [selectedOption, setSelectedOption] = useState('Destinos');
  const { destinos, isPending: isPendingDestinos } = useDestinos();
  const { categorias, isPending: isPendingCategorias, deleteCategoria } = useCategorias();
  const { relaciones, isLoading: isLoadingRelaciones } = useDestinoCategoria();

  const columnConfig = {
    Destinos: [
      { id: 'id', label: 'ID', field: 'idDestino' },
      { id: 'nombre', label: 'Nombre', field: 'nombre' },
      { id: 'descripcion', label: 'Descripción', field: 'descripcion' },
      { id: 'region', label: 'Región', field: 'region' },
      { 
        id: 'imagen', 
        label: 'Imagen', 
        render: (item) => (
          <Box 
            component="img"
            src={item.imagen} 
            alt={item.nombre}
            sx={{ 
              width: 50, 
              height: 50, 
              objectFit: 'cover',
              borderRadius: 1
            }}
          />
        )
      },
      { id: 'pais', label: 'País', field: 'pais' },
      { 
        id: 'acciones', 
        label: 'Acciones', 
        render: (item) => (
          <Button 
            variant="outlined" 
            color="error"
            onClick={() => handleDelete(item.idDestino, item.nombre)}
          >
            Eliminar
          </Button>
        )
      }
    ],
    Categorias: [
      { id: 'id', label: 'ID', field: 'idCategoria' },
      { id: 'nombre', label: 'Nombre', field: 'nombre' },
      { id: 'descripcion', label: 'Descripción', field: 'descripcion' },
      { 
        id: 'acciones', 
        label: 'Acciones',
        render: (item) => (
          <Button 
            variant="outlined" 
            color="error"
            onClick={() => handleDelete(item.idCategoria, item.nombre)}
          >
            Eliminar
          </Button>
        )
      }
    ],
    CategoriaDestino: [
      { id: 'idDestino', label: 'ID Destino', field: 'iD_Destino' },
      { id: 'idCategoria', label: 'ID Categoría', field: 'iD_Categoria' },
      { id: 'nombreDestino', label: 'Nombre Destino', field: 'nombreDestino' },
      { id: 'nombreCategoria', label: 'Nombre Categoría', field: 'nombreCategoria' },
      { 
        id: 'acciones', 
        label: 'Acciones',
        render: (item) => (
          <Button 
            variant="outlined" 
            color="error"
            onClick={() => handleDeleteRelacion(item.iD_Destino, item.iD_Categoria)}
          >
            Eliminar
          </Button>
        )
      }
    ]
  };

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleDelete = async (id, nombre) => {
    try {
      if (selectedOption === 'Categorias') {
        await deleteCategoria.mutateAsync(id);
      }
      alert(`${nombre} se ha borrado correctamente`);
    } catch (error) {
      alert(`Ocurrió un error al eliminar: ${error.message}`);
    }
  };

  const handleDeleteRelacion = async (idDestino, idCategoria) => {
    try {
      alert(`Relación entre destino ${idDestino} y categoría ${idCategoria} eliminada`);
    } catch (error) {
      alert(`Ocurrió un error al eliminar la relación: ${error.message}`);
    }
  };

  const getCurrentData = () => {
    switch (selectedOption) {
      case 'Destinos':
        return { data: destinos, isLoading: isPendingDestinos };
      case 'Categorias':
        return { data: categorias, isLoading: isPendingCategorias };
      case 'CategoriaDestino':
        return { data: relaciones, isLoading: isLoadingRelaciones };
      default:
        return { data: [], isLoading: false };
    }
  };

  const { data, isLoading } = getCurrentData();

  return (
    <Box sx={{ display:'flex', flexDirection:'column',p: 3 }}>
      <FormControl fullWidth sx={{ mb: 3, maxWidth: 300 }}>
        <InputLabel id="view-select-label">Ver</InputLabel>
        <Select
          labelId="view-select-label"
          id="view-select"
          value={selectedOption}
          label="Ver"
          onChange={handleChange}
        >
          <MenuItem value="Destinos">Destinos</MenuItem>
          <MenuItem value="Categorias">Categorias</MenuItem>
          <MenuItem value="CategoriaDestino">Relaciones Destino-Categoría</MenuItem>
        </Select>
      </FormControl>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              {columnConfig[selectedOption].map((column) => (
                <TableCell key={column.id}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columnConfig[selectedOption].length} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              data?.map((item, index) => (
                <TableRow 
                  key={selectedOption === 'CategoriaDestino' 
                    ? `${item.iD_Destino}-${item.iD_Categoria}` 
                    : item[`id${selectedOption}`]}
                  sx={{
                    backgroundColor: index % 2 === 0 ? '#c4c1e0' : '#ffe9e3'
                  }}
                >
                  {columnConfig[selectedOption].map((column) => (
                    <TableCell 
                      key={selectedOption === 'CategoriaDestino'
                        ? `${item.iD_Destino}-${item.iD_Categoria}-${column.id}`
                        : `${item[`id${selectedOption}`]}-${column.id}`}
                    >
                      {column.render 
                        ? column.render(item) 
                        : item[column.field]
                      }
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminVer;