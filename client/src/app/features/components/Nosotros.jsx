import React, { Children, useState } from 'react'
import styles from '../../css/Nosotros.module.css'
import { Box,Typography } from '@mui/material'


const paddinBoxLeft =6;


const Nosotros = () => {

    const [select, setSelect] = useState(0);

    const handleSelect = (row) =>{
        setSelect(row);
    }

  return (
    <Box sx={{width: '100%', height:'30rem'}} >
        <Box className={styles.parent} >
            <Box onClick={()=>handleSelect(0, '#66bfbf')} className={styles.div1} 
                sx={{backgroundColor: select === 0 && '#66bfbf', cursor: 'pointer', alignItems:'center', display: 'flex', pl: paddinBoxLeft}}> 
                <Typography variant='h3'>Seguro de viaje</Typography>
            </Box>
            <Box onClick={()=>handleSelect(1, '#8594e4')} className={styles.div2} 
                sx={{backgroundColor: select === 1 && '#8594e4', cursor: 'pointer', alignItems:'center', display: 'flex', pl: paddinBoxLeft}}>
                <Typography variant='h3'>Viaje guiado</Typography>
            </Box>
            <Box onClick={()=>handleSelect(2, '#cca8e9')} className={styles.div3} 
                 sx={{backgroundColor: select === 2 && '#cca8e9', cursor: 'pointer', alignItems:'center', display: 'flex', pl: paddinBoxLeft}}>
                <Typography variant='h3'>Hospedaje</Typography>
            </Box>
            <Box className={styles.right_column}>
                <ShowColumn row={select} color={select === 0 ? '#66bfbf' : select === 1 ? '#8594e4' : '#cca8e9'}/>
            </Box>
        </Box>
    
    </Box>
  )
}

export const ShowColumn = ({ row, color }) => {
    return (
      {
        0: <ColumnRight 
            encabezado='Viaja sin miedo'
            textPrincipal='Viaja sin preocupaciones'
            subText='Conoce los mejores destinos y disfruta de tu viaje con la tranquilidad de estar protegido.'
            _backColor={color} />,
        1: <ColumnRight 
            encabezado='Los mejores guias'
            textPrincipal='Explora el mundo con nosotros'
            subText='Descubre los mejores destinos con nuestros guías expertos.'
            _backColor={color} />,
        2: <ColumnRight 
            encabezado='Un hospedaje a tu medida'
            textPrincipal='Tu hogar lejos de casa'
            subText='Disfruta de una experiencia única en nuestros alojamientos seleccionados.' 
            _backColor={color}  />
      }[row] || null 
    );
};

export const ColumnRight = ({encabezado, textPrincipal, subText, _backColor, children}) => {
    return(
        <Box sx={{display: 'flex', flexDirection: 'column', gap: 4, backgroundColor: _backColor, height: '100%', width: '100%', padding: 4}}>
            <Typography variant='subtitle2' sx={{color: 'white', fontWeight: 'bold'}}>{encabezado}</Typography>
            <Typography variant='h3' sx={{color: 'white', fontWeight: 'bold'}}>{textPrincipal}</Typography>
            <Typography variant='subtitle1' sx={{color: 'white', fontWeight: 'bold'}}>{subText}</Typography>
            {children}
        </Box>
    );
}

export default Nosotros