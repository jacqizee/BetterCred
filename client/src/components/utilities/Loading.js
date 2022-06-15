import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import BouncingCards from '../../assets/bouncing-cards.gif'
import { flexCentered } from '../styles/Styling'

const Loading = () => {
  return (
    <Box sx={{ ...flexCentered, width: '100vw', height: 'calc(100vh - 60px)' }}>
      <Box component='img' src={BouncingCards} sx={{ width: '35rem' }}  />
    </Box>
  )
}

export default Loading