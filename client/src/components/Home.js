import { Link } from 'react-router-dom'

import theme from './styles/Theme'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import DippedCard from '../assets/dipped-card.gif'
import FloatingCard from '../assets/floating-card.gif'

const Home = ({ mode }) => {

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', alignItems: 'center', bgcolor: 'background.default' }}>
      <Box sx={{ width: '100vw', height: 'calc(100vh - 60px)', textAlign: 'center', zIndex: 0 }}>
        <Box component='img' src={FloatingCard} alt='floating credit card' sx={{ position: 'fixed', top: '15%', zIndex: -25, height: '80%', filter: 'drop-shadow(1px 1px 5px white) drop-shadow(-1px -1px 5px white)' }} />
        <Box id='home-main'
          sx={{ display: 'flex',
            flexDirection: 'column',
            textAlign: 'left',
            justifyContent: 'center',
            height: '100%',
            ml: '8%',
          }}>
          <Typography variant='h1' sx={{ fontWeight: 500, color: theme(mode).palette.primary.main, textShadow: `5px 5px ${theme(mode).palette.primary.shadow}` }}>BetterCred</Typography>
          <Typography variant='h4' sx={{ fontWeight: 200, mt: -1, mb: 1, ml: 1, color: theme(mode).palette.primary.contrastText }}>Smarter Credit Decisions</Typography>
          <Button color='primary' variant='contained' component={Link} to='/cards' sx={{ width: '10rem', ml: 2 }}>Explore Cards</Button>
        </Box>
      </Box>
    </Box>
    
  )
}

export default Home