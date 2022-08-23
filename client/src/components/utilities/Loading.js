import { Box, Typography } from '../styles/MaterialUI'

import BouncingCards from '../../assets/bouncing-cards.gif'
import { flexCentered } from '../styles/Styling'

const Loading = () => {
  return (
    <Box sx={{ ...flexCentered, width: '100vw', height: 'calc(100vh - 60px)', bgcolor: 'background.default' }}>
      <Box component='img' src={BouncingCards} sx={{ width: '35rem' }}  />
    </Box>
  )
}

export default Loading