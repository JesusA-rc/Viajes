import React from 'react'
import { Box, Typography } from '@mui/material';

const CardDestinoNombre = ({itemCard}) => {


  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, width:'100%', alignItems:'center', justifyContent:'center'}}>

        {itemCard.map((destino) => (
            <Box
                key={destino.id_categoria}
                sx={{
                    position: 'relative',
                    width: '150px', 
                    height: '150px', 
                    backgroundImage: `url(${destino.imagen})`, 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center', 
                    borderRadius: '8px', 
                    overflow: 'hidden', 
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.6)', 
                        color: 'white',
                        padding: '4px 8px',
                        textAlign: 'center',
                        fontSize: '14px',
                        fontWeight: 'bold',
                    }}
                >
                    {destino.nombre}
                </Box>
            </Box>
        ))}
    </Box>
  )
}

export default CardDestinoNombre