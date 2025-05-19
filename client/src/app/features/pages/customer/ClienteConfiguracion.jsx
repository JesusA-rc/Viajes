import { Box } from '@mui/material'
import ProfileContent from './Profiles/ProfileContent'

const ClienteConfiguracion = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', backgroundColor: '#222831' }}>
      <ProfileContent/>
    </Box>
  )
}

export default ClienteConfiguracion