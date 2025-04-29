import React from 'react'
import { Typography } from '@mui/material'

const TypographyNavBar = ({header}) => {

  return (
    <Typography
      variant="h6"
      noWrap
      component="a"
      href="#app-bar-with-responsive-menu"
      sx={{
        mr: 2,
        display: { xs: 'none', md: 'flex' },
        fontFamily: 'monospace',
        fontWeight: 700,
        letterSpacing: '.3rem',
        color: 'inherit',
        textDecoration: 'none',
      }}
    >
      {header}
    </Typography>
  )
}

export default TypographyNavBar