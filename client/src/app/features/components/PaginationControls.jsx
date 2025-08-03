import React from 'react';
import { Box, Button, Stack, IconButton, useMediaQuery, Typography } from '@mui/material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LastPageIcon from '@mui/icons-material/LastPage';

const PRIMARY = '#1976d2';
const PRIMARY_DARK = '#115293';
const HOVER_BG = '#f0f0f0';

const PaginationControls = ({
  page,
  limit,
  totalItems,
  totalPages = Math.ceil(totalItems / limit), // Calcula totalPages si no se proporciona
  onPageChange,
  isFetching,
  isPreviousData
}) => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const disabled = isFetching || isPreviousData;

  // Mostrar información de paginación (opcional)
  const itemsInfo = `Mostrando ${(page - 1) * limit + 1}-${Math.min(page * limit, totalItems)} de ${totalItems}`;

  const getDisplayedPages = () => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    
    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages, page + 2);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <Box sx={{ 
      mt: 2, 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      flexWrap: 'wrap' 
    }}>
      {/* Información de items (opcional) */}
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {itemsInfo}
      </Typography>

      {/* Controles de paginación */}
      <Box sx={{ display: 'flex', gap: 1 }}>
        {!isMobile && (
          <IconButton
            aria-label="first page"
            size="small"
            onClick={() => onPageChange(1)}
            disabled={page === 1 || disabled}
          >
            <FirstPageIcon fontSize="small" />
          </IconButton>
        )}

        <IconButton
          aria-label="previous page"
          size="small"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1 || disabled}
        >
          <ChevronLeftIcon fontSize="small" />
        </IconButton>

        <Stack direction="row" spacing={0.5} alignItems="center">
          {getDisplayedPages().map((pageNumber) => (
            <Button
              key={pageNumber}
              size="small"
              onClick={() => onPageChange(pageNumber)}
              variant={pageNumber === page ? 'contained' : 'text'}
              disabled={disabled}
              sx={{
                minWidth: 32,
                padding: '5px 10px',
                borderRadius: pageNumber === page ? '50%' : 1,
                fontWeight: pageNumber === page ? 'bold' : 'normal',
                backgroundColor: pageNumber === page ? PRIMARY : 'transparent',
                color: pageNumber === page ? '#fff' : PRIMARY,
                '&:hover': {
                  backgroundColor: pageNumber === page ? PRIMARY_DARK : HOVER_BG,
                },
                textTransform: 'none',
              }}
            >
              {pageNumber}
            </Button>
          ))}

          {(isMobile || totalPages > 5) && page < totalPages - 2 && (
            <Button disabled size="small" sx={{ minWidth: 32 }}>
              <Typography sx={{ fontWeight: 'bold' }}>...</Typography>
            </Button>
          )}
        </Stack>

        <IconButton
          aria-label="next page"
          size="small"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages || disabled}
        >
          <ChevronRightIcon fontSize="small" />
        </IconButton>

        {!isMobile && (
          <IconButton
            aria-label="last page"
            size="small"
            onClick={() => onPageChange(totalPages)}
            disabled={page >= totalPages || disabled}
          >
            <LastPageIcon fontSize="small" />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default PaginationControls;