import { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  Select,
  MenuItem,
  Tooltip,
  TableCell,
  Typography,
  Dialog,
  DialogTitle,
  Button,
  DialogActions,
  DialogContent,
  Menu,
  Checkbox,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PaginationControls from './PaginationControls';
import SearchBarPagination from './SearchBarPagination';

const DataTable = ({ 
  columns, 
  data = [], 
  actions: customActions = [], 
  onEdit, 
  onDelete,
  pagination = {
    page: 1,
    limit: 10,
    totalItems: 0,
    onPageChange: () => console.warn('onPageChange no implementado'),
    onLimitChange: () => console.warn('onLimitChange no implementado'),
    isFetching: false
  }
}) => {
  const {
    page,
    limit,
    totalItems,
    onPageChange,
    onLimitChange = () => {},
    isFetching
  } = pagination;

  const [columnVisibility, setColumnVisibility] = useState(() =>
    Object.fromEntries(columns.map(col => [col.accessor, true]))
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [openConfirm, setOpenConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleChangeRowsPerPage = (event) => {
    const newLimit = parseInt(event.target.value, 10);
    onLimitChange(newLimit);
  };

  const paginationConfig = {
    page,
    limit,
    totalItems,
    totalPages: Math.ceil(totalItems / limit),
    onPageChange,
    isFetching
  };

  const handleDeleteClick = (item) => {
    if (onDelete) {
      setItemToDelete(item);
      setOpenConfirm(true);
    }
  };

  const confirmDelete = () => {
    if (itemToDelete && onDelete) {
      onDelete(itemToDelete);
    }
    handleCloseConfirm();
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
    setItemToDelete(null);
  };

  const builtInActions = [
    ...(onEdit ? [{
      type: 'edit',
      onClick: onEdit,
      icon: <EditIcon fontSize="small" />,
      tooltip: 'Editar',
    }] : []),
    ...(onDelete ? [{
      type: 'delete',
      onClick: handleDeleteClick,
      icon: <DeleteIcon fontSize="small" />,
      tooltip: 'Eliminar',
    }] : [])
  ];

  const allActions = [...builtInActions, ...customActions];
  const hasActions = allActions.length > 0;

  const filteredData = useMemo(() => {
    console.log('Filtrando datos con término:', searchTerm);
    if (!searchTerm) return data;
    
    const lowercasedSearch = searchTerm.toLowerCase();
    
    return data.filter(row => {
      return columns.some(col => {
        const value = row[col.accessor];
        return String(value).toLowerCase().includes(lowercasedSearch);
      });
    });
  }, [data, searchTerm, columns]); 

  return (
    <Box sx={{ width: '100%', mb: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <SearchBarPagination searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <span>Entries</span>
          <Select
            value={limit.toString()}
            onChange={handleChangeRowsPerPage}
            sx={{ minWidth: 80 }}
            disabled={isFetching}
          >
            {[5, 10, 25].map((size) => (
              <MenuItem key={size} value={size}>
                {size}
              </MenuItem>
            ))}
          </Select>
          <Button
            size="small"
            startIcon={<VisibilityIcon fontSize="small" />}
            onClick={(e) => setAnchorEl(e.currentTarget)}
            sx={{ textTransform: 'none' }}
            disabled={isFetching}
          >
            Columns
          </Button>
        </Box>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          style: { maxHeight: 400, width: 250 },
        }}
      >
        {columns.map((col) => {
          const key = col.accessor;
          return (
            <MenuItem key={key}>
              <Checkbox
                checked={columnVisibility[key]}
                onChange={() => setColumnVisibility(prev => ({
                  ...prev,
                  [key]: !prev[key]
                }))}
                size="small"
              />
              <ListItemText primary={col.header} />
              <ListItemIcon>
                {columnVisibility[key] ? (
                  <VisibilityIcon fontSize="small" color="action" />
                ) : (
                  <VisibilityOffIcon fontSize="small" color="disabled" />
                )}
              </ListItemIcon>
            </MenuItem>
          );
        })}
      </Menu>

      <TableContainer
        component={Paper}
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          border: '1px solid #e3f2fd',
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1976d2' }}>
              {columns.map((col, index) => {
                const key = col.accessor;
                if (!columnVisibility[key]) return null;
                return (
                  <TableCell
                    key={index}
                    sx={{
                      color: 'white',
                      fontWeight: 'bold',
                      borderColor: '#bbdefb',
                    }}
                  >
                    {col.header}
                  </TableCell>
                );
              })}
              {hasActions && (
                <TableCell
                  sx={{
                    color: 'white',
                    fontWeight: 'bold',
                    borderColor: '#bbdefb',
                    width: '150px',
                    textAlign: 'center',
                  }}
                >
                  Acciones
                </TableCell>
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (hasActions ? 1 : 0)}
                  align="center"
                  sx={{ py: 3, color: 'text.secondary' }}
                >
                  {searchTerm ? 'No se encontraron resultados para la búsqueda' : 'No hay registros disponibles'}
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  hover
                  sx={{
                    '&:nth-of-type(odd)': { backgroundColor: '#e3f2fd' },
                    '&:nth-of-type(even)': { backgroundColor: '#ffffff' },
                  }}
                >
                  {columns.map((col, colIndex) => {
                    const key = col.accessor;
                    if (!columnVisibility[key]) return null;
                    const value = row[key];
                    const isNumeric = typeof value === 'number' && !isNaN(value);
                    
                    const align = key === 'id' ? 'left' : (isNumeric ? 'right' : 'left');

                    return (
                      <TableCell
                        key={`${rowIndex}-${colIndex}`}
                        align={align}
                        sx={{ textAlign: align }}
                      >
                        {col.render ? (
                          col.render(value, row)
                        ) : (
                          <Typography noWrap>
                            {String(value)}
                          </Typography>
                        )}
                      </TableCell>
                    );
                  })}

                  {hasActions && (
                    <TableCell
                      sx={{
                        width: '150px',
                        padding: '8px',
                        textAlign: 'center',
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          gap: '6px',
                        }}
                      >
                        {allActions.map((action, idx) => (
                          <Tooltip title={action.tooltip} arrow key={idx}>
                            <span>
                              <IconButton
                                size="small"
                                onClick={() => action.onClick(row)}
                                sx={{
                                  color: action.type === 'edit' ? '#0288d1' :
                                         action.type === 'delete' ? '#d32f2f' :
                                         'primary.main',
                                  '&:hover': {
                                    backgroundColor: action.type === 'edit' ? '#b3e5fc' :
                                                    action.type === 'delete' ? '#ffcdd2' :
                                                    'action.hover',
                                    transform: 'scale(1.1)',
                                  },
                                  transition: 'transform 0.2s',
                                }}
                                disabled={(action.type === 'delete' && !onDelete) || isFetching}
                              >
                                {action.icon}
                              </IconButton>
                            </span>
                          </Tooltip>
                        ))}
                      </Box>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        aria-labelledby="confirm-delete-dialog"
      >
        <DialogTitle id="confirm-delete-dialog">Confirmar eliminación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que deseas eliminar este elemento? Esta acción no se puede deshacer.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <PaginationControls {...paginationConfig} />
    </Box>
  );
};

export default DataTable;