import { Link } from 'react-router-dom'

import theme from './styles/Theme'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import DippedCard from '../assets/dipped-card.gif'
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
    }}>
      <Box id='home-main'
        sx={{ display: 'flex',
          flexDirection: 'column',
          textAlign: { xs: 'center', md: 'left' },
          alignItems: { xs: 'center', md: 'flex-start' },
          justifyContent: 'center',
          ml: { xs: 0, md: '10%' },
          width: 'fit-content',
          p: 5,
          position: 'fixed',
          top: '35%',
          bgcolor: 'background.defaultContrast',
        }}>
        <Typography variant='h1' sx={{ fontWeight: 500, color: theme(mode).palette.primary.main, textShadow: `5px 5px ${theme(mode).palette.primary.shadow}` }}>BetterCred</Typography>
        <Typography variant='h4' sx={{ fontWeight: 200, mt: -1, mb: 1, ml: 1, color: theme(mode).palette.primary.contrastText }}>Smarter Credit Decisions</Typography>
        <Button color='primary' variant='contained' component={Link} to='/cards' sx={{ width: '10rem', ml: 2 }}>Explore Cards</Button>
      </Box>
    </Box>
    
  )
}

export default Home