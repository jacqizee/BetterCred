import { Link } from 'react-router-dom'

import theme from './styles/Theme'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Slide from '@mui/material/Slide'

import FloatingCard from '../assets/floating-card.gif'
import OfficeLight from '../assets/office-background.jpeg'
import OfficeDark from '../assets/office-background-dark.jpeg'

const Home = ({ mode }) => {

  return (
    <Box sx={{ backgroundImage: `url(${ mode === 'dark' ? OfficeDark : OfficeLight })`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right',
      height: 'calc(100vh - 60px)',
      display: 'flex',
      justifyContent: 'center',
    }}>
      <Slide in={true} direction='right' timeout={{ enter: 1000 }}>
        <Box id='home-main'
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            justifyContent: 'center',
            width: 'fit-content',
            px: { xs: 0, sm: 5 },
            py: { xs: 2, sm: 5 },
            position: 'fixed',
            top: '35%',
            bgcolor: 'background.defaultMoreContrast',
            boxShadow: '0 0 15px white',
          }}>
          <Typography variant='h2' sx={{ fontWeight: 700, color: theme(mode).palette.primary.main, textShadow: '0 0 5px white' }}>BetterCred</Typography>
          <Typography variant='h5' sx={{ fontWeight: 200, mt: -1, mb: 1, ml: 1, color: theme(mode).palette.secondary.main, textShadow: `2px 2px ${theme(mode).palette.secondary.contrastText}` }}>Smarter Credit Decisions</Typography>
          <Button color='primary' variant='contained' component={Link} to='/cards' sx={{ width: '10rem', ml: 2 }}>Explore Cards</Button>
        </Box>
      </Slide>
    </Box>
    
  )
}

export default Home