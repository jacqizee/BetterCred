import { useState } from 'react'

// MUI Components
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const MyCards = () => {
  return (
    <Box id='my-cards'
      component='form'
      sx={{ width: '75%', maxWidth: '850px', display: 'flex', flexDirection: 'column', ml: { xs: 3, md: 3.5 }, bgcolor: 'background.paper', p: 5, height: 'fit-content' }}>
    </Box>
  )
}

export default MyCards