import { Link } from 'react-router-dom'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import WorriedCard from '../../assets/worried-card.gif'

import { flexCentered } from '../styles/Styling'

const Error = () => {
  return (
    <Box sx={{ ...flexCentered, width: '100vw', height: '65vh' }}>
      <Typography variant='h4' sx={{ mt: '25vh' }}>Error</Typography>
      <Typography component={Link} to='/'>Back to Home</Typography>
      <Box component='img' src={WorriedCard} sx={{ width: '25rem' }}  />
    </Box>
  )
}

export default Error