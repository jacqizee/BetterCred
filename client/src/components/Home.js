import { Link } from 'react-router-dom'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const Home = () => {
  return (
    <Box id='home-main' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '90vh' }}>
      <Typography variant='h1'>BetterCred</Typography>
      <Typography variant='h3' sx={{ mb: 1 }}>Smarter Credit Decisions</Typography>
      <Button component={Link} to='/cards'>Explore Cards</Button>
    </Box>
  )
}

export default Home