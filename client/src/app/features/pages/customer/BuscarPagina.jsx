import React from 'react'
import { Box } from '@mui/material'
import NavBarCliente from './NavBarCliente';
import SearchBar from '../../components/SearchBar';

const BuscarPagina = () => {

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', backgroundColor: '#222831' }}>
        <NavBarCliente />
        <Box sx={{display:'flex',gap:4}}>
          <SearchBar></SearchBar>
        </Box>

    </Box>
  )
}

export default BuscarPagina