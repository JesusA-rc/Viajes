import { Box, Typography} from '@mui/material'
import ButtonBackImage from '../components/ButtonBackImage'
import React from 'react'

const images = [
  {
    id: 1,
    url: 'https://th.bing.com/th/id/OIP.O20223hRm6fF1STQ46mVFQHaE8?rs=1&pid=ImgDetMain',
    title: 'Cliente',
    width: '40%',
    path: '/destinos'
  },
  {
    id: 2,
    url: 'https://th.bing.com/th/id/OIP.dhuFH1HcB0l3Fhdl-NnNIAHaE8?rs=1&pid=ImgDetMain',
    title: 'Admin',
    width: '40%',
    path: '/adminHp'
  }
];

const HomePage = () => {
  return (
    <Box 
    sx={{
      display: 'flex',
      minHeight: '100vh',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#2A7B9B'
    }}> 
      <Typography variant="h1" color='#ff5722'>
        Welcome
      </Typography>

      <Box sx={{
        display:'flex',
        gap: 3,
        alignItems:'center',
        flexWrap:'wrap',
        width:'100%',
        justifyContent:'center',
        mt: 10
      }}>
        <ButtonBackImage images={images}/>
      </Box>

    </Box>
  )
}

export default HomePage