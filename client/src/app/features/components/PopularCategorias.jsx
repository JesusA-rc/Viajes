import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import CardCategoria from './Cards/CardCategoria'
import { useCategorias } from '../../../lib/hooks/useCategorias';

const PopularCategorias = () => {

    const { categorias, isPending } = useCategorias();

    if(isPending){
        return(
            <Typography>Cargando categorias...</Typography>
        )
    }

    if (categorias.length === 0) {
        return <Typography>No hay categorías disponibles.</Typography>;
    }

    const visibleCategorias = categorias.slice(0, 8);

  return (
    <Box sx={{ display: 'flex', flexDirection:'column', gap:5, mt:7}}>
        <Box sx={{display:'flex', alignItems:'center', gap: 2, justifyContent: 'space-between'}}>
            <Box display={{display:'flex', flexDirection:'column'}}> 
                <Typography variant='h4' sx={{fontWeight:'bold'}}>Descubra nuestas categorias</Typography>
                <Typography>Los destinos mas aclamados por los usuarios.</Typography>
            </Box>
            <Button variant="contained" sx={{backgroundColor:'#72e8e1'}}>Ver mas</Button>
        </Box>
        <Box sx={{display: 'flex', flexWrap:'wrap', gap:5, alignItems:'center', justifyContent:'center' }}>
            {
                visibleCategorias.map((c)=>(
                    <CardCategoria key={c.idCategoria} Nombre={c.nombre} Descripcion={c.descripcion}/>
                ))
            }
        </Box>


    </Box>
  )
}

export default PopularCategorias