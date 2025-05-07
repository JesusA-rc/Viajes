import React from 'react'
import NavBarCliente from '../pages/customer/NavBarCliente'
import UserCustomProfile from '../pages/customer/UserCustomProfile'

import { Box } from '@mui/material'

const UserBanner = () => {
  return (
    <Box sx={{display:'flex',flexDirection:'column', width:'100%', backgroundColor: '#222831'}}>
      <NavBarCliente />
      <UserCustomProfile/>
    </Box>
  )
}

export default UserBanner