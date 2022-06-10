import { Link } from 'react-router-dom'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import DippedCard from '../assets/dipped-card.gif'

const Home = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
      <Box sx={{ width: '100vw', textAlign: 'center' }}>
        <Box component='img' src={DippedCard} alt='dipped credit card' sx={{ position: 'fixed', zIndex: -100 }} />
        <Box id='home-main'
          sx={{ display: 'flex', flexDirection: 'column', textAlign: 'left', justifyContent: 'center', height: '90vh', p: 10 }}>
          <Typography variant='h1'>BetterCred</Typography>
          <Typography variant='h4' sx={{ mb: 1, ml: 1 }}>Smarter Credit Decisions</Typography>
          <Button component={Link} to='/cards' sx={{ width: '10rem' }}>Explore Cards</Button>
        </Box>
      </Box>
    </Box>
    
  )
}

export default Home