import { Link } from 'react-router-dom'

import { Box, Typography } from '../styles/MaterialUI'

import AngryCard from '../../assets/angry-card.gif'
import { flexCentered } from '../styles/styling'

const NotFound = () => {
  return (
    <Box sx={{ ...flexCentered, width: '100vw', height: 'calc(100vh - 60px)', bgcolor: 'background.default', color: 'primary.contrastText' }}>
      <Typography variant='h4'>Page Not Found</Typography>
      <Typography component={Link} to='/' sx={{ color: 'primary.contrastText' }}>Back to Home</Typography>
      <Box component='img' src={AngryCard} sx={{ width: '25rem' }}  />
    </Box>
  )
}

export default NotFound