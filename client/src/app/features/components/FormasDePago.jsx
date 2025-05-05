import React from 'react';
import { Typography, Button, Box, Avatar } from '@mui/material';
import styles from './FormasDePago.module.css';

const FormasDePago = () => {

  const avatarImages = [
    {
      id: 1,
      src: 'https://th.bing.com/th/id/OIP.08pbRxr6BpSE6zsBpVVN_wHaFj?rs=1&pid=ImgDetMain',
      alt: 'Pay pal'
    },
    {
      id: 2,
      src: 'https://th.bing.com/th/id/R.1460d1ccf3b60f028d6498f8250fb536?rik=OsWG6kmE7JigFA&pid=ImgRaw&r=0',
      alt: 'Mercado pago'
    },
    {
      id: 3,
      src: 'https://static.vecteezy.com/system/resources/previews/020/975/572/large_2x/visa-logo-visa-icon-transparent-free-png.png',
      alt: 'Visa'
    }
  ]

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: { xs: 'column', sm: 'row' },
        width: { xs: '90%', sm: '100%' }, 
        margin: '0 auto', 
        gap: 4
      }}
    >
      <Box sx={{ height: { xs: '300px', sm: '600px' } }}>
      <div className={styles.parent}>
          <div className={styles.div1}>
            <img
              src="https://th.bing.com/th/id/OIP.BS5roNrxR74dFeEzMwEjgwHaFj?rs=1&pid=ImgDetMain"
              alt="Imagen 1"
            />
          </div>
          <div className={styles.div3}>
            <img
              src="https://th.bing.com/th/id/OIP._cXd3l3eFNiXFSfa-YWU3wHaEs?rs=1&pid=ImgDetMain"
              alt="Imagen 2"
            />
          </div>
          <div className={styles.div4}>
            <img
              src="https://th.bing.com/th/id/OIP.3jnAhorwd6-PRlW7Lhl2tQHaF1?rs=1&pid=ImgDetMain"
              alt="Imagen 3"
            />
          </div>
        </div>
      </Box>


      <Box sx={{display: 'flex', flexDirection: 'column', gap:4}}>
        <Typography variant='h4' sx={{fontWeight:'bold'}}>Paga facil</Typography>
        <Typography variant='subtitle1' sx={{color:'gray', fontWeight:'bold'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum fugit aut, consequuntur sequi ducimus optio iusto labore suscipit magni at rerum? Possimus rem, facilis laudantium labore delectus facere ipsam nobis!</Typography>
        <Box sx={{display:'flex', gap:2, flexWrap:'wrap'}}>
          {avatarImages.map((image, index) => (
            <Avatar
              key={index}
              alt={image.id}
              src={image.src}
              sx={{ width: 56, height: 56, backgroundColor: 'white'}}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default FormasDePago;