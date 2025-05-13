import React, { useState, useEffect, useContext } from 'react';
import { Box, TextField, Typography, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear'; 
import { FiltrosContext } from '../contexts/FiltrosContext';


const SearchBar = () => {
    const { filtros, setFiltros } = useContext(FiltrosContext);
    const [searchText, setSearchText] = useState(filtros.busqueda);

    const handleInputChange = (event) => {
        setSearchText(event.target.value);
    };

    const handleClear = () => {
        setSearchText('');
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setFiltros(prev => ({ ...prev, busqueda: searchText }));
        }, 300); 
        
        return () => clearTimeout(timer);
    }, [searchText, setFiltros]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width:'100%' }}>
            <Typography variant="subtitle1" sx={{ color: 'white', fontSize: '0.8rem', fontWeight: 'bold' }}>
                Filtros
            </Typography>
            <TextField
                variant="standard"
                fullWidth
                size="small"
                value={searchText}
                onChange={handleInputChange}
                placeholder='Buscar destino'
                InputProps={{
                    startAdornment: <SearchIcon sx={{ color: 'white', mr: 1 }} />,
                    endAdornment: searchText && (
                    <IconButton 
                        onClick={handleClear} 
                        edge="end"
                        sx={{ 
                            visibility: searchText ? 'visible' : 'hidden',
                            padding: '4px', 
                            marginRight: '-4px', 
                        }}
                    >
                        <ClearIcon sx={{ color: 'white', fontSize: '18px' }} /> 
                    </IconButton>
                    ),
                }}
                sx={{
                    '& .MuiInputBase-root': {
                        backgroundColor: '#222831',
                        color: 'white',
                        width: '100%', 
                        maxWidth: '100%'
                    },
                }}
            />
        </Box>
    );
};

export default SearchBar;