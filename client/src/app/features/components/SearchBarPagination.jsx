import { TextField, IconButton, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

const SearchBarPagination = ({ searchTerm, setSearchTerm }) => (
  <TextField
    label="Buscar..."
    variant="outlined"
    size="small"
    fullWidth
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    slotProps={{
      input: {
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon fontSize="small" sx={{ color: 'action.active' }} />
          </InputAdornment>
        ),
        endAdornment: searchTerm ? (
          <InputAdornment position="end">
            <IconButton
              size="small"
              onClick={() => setSearchTerm('')}
              edge="end"
              sx={{ mr: 1 }}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          </InputAdornment>
        ) : null,
      },
    }}
    sx={{
      width: '300px',
      '& .MuiOutlinedInput-root': {
        borderRadius: 20,
        paddingLeft: 0.5,
      },
    }}
  />
);

export default SearchBarPagination;
