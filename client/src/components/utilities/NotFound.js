import { Link } from 'react-router-dom'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import AngryCard from '../../assets/angry-card.gif'
import { flexCentered } from '../styles/Styling'

const NotFound = () => {
  return (
    <Box sx={{ ...flexCentered, width: '100vw', height: '65vh' }}>
      <Typography variant='h4' sx={{ mt: '25vh' }}>Page Not Found</Typography>
      <Typography component={Link} to='/'>Back to Home</Typography>
      <Box component='img' src={AngryCard} sx={{ width: '25rem' }}  />
    </Box>
  )
}

export default NotFound