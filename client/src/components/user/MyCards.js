import { useState } from 'react'

// MUI Components
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const MyCards = () => {
  return (
    <Box id='my-cards'
      sx={{ width: '75%', maxWidth: '850px', display: 'flex', flexDirection: 'column', ml: { xs: 3, md: 3.5 }, bgcolor: 'background.paper', p: 5, height: 'fit-content' }}>
    
      {/* Heading and Subheading */}
      <Typography variant='h5' sx={{ color: 'primary.contrastText' }}>My Cards</Typography>
      <Typography variant='body1' sx={{ color: 'primary.contrastText', mb: 1 }}>View cards saved to your wallet</Typography>
    
    </Box>
  )
}

export default MyCards