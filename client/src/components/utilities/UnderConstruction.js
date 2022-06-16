import { Link } from 'react-router-dom'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import Construction from '../../assets/under-construction.gif'
import { flexCentered } from '../styles/Styling'

const UnderConstruction = () => {
  return (
    <Box sx={{ ...flexCentered, width: '100vw', height: 'calc(100vh - 60px)', bgcolor: 'background.default', color: 'primary.contrastText' }}>
      <Typography variant='h4'>Under Construction</Typography>
      <Typography variant='subtitle1'>Stay tuned! :)</Typography>
      <Typography component={Link} to='/' sx={{ color: 'primary.contrastText' }}>Back to Home</Typography>
      <Box component='img' src={Construction} sx={{ width: '25rem', mt: 2, borderRadius: 2, boxShadow: 5 }}  />
    </Box>
  )
}

export default UnderConstruction