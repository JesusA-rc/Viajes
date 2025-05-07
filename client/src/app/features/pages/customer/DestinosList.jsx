import React from 'react'
import { Box } from '@mui/material'
import UserBanner from '../../components/UserBanner'

const DestinosList = () => {
  return (
    <Box sx={{display:'flex',flexDirection:'column', width:'100%', backgroundColor: '#222831'}}>
        <UserBanner/>
    </Box>
  )
}

export default DestinosList