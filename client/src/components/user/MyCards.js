import { useState, useEffect } from 'react'

// MUI Components
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'

const MyCards = ({ profileDetails, setProfileDetails }) => {

  useEffect(() => {
    console.log(profileDetails.wallet)
  })

  return (
    <Box id='my-cards'
      sx={{ width: '75%',
        maxWidth: '850px',
        display: 'flex',
        flexDirection: 'column',
        ml: { xs: 3, md: 3.5 },
        bgcolor: 'background.paper',
        p: 5,
        height: 'fit-content' }}>
    
      {/* Heading and Subheading */}
      <Typography variant='h5' sx={{ color: 'primary.contrastText' }}>My Cards</Typography>
      <Typography variant='body1' sx={{ color: 'primary.contrastText', mb: 1 }}>View cards saved to your wallet</Typography>
      <Divider sx={{ my: 1 }} />

      {/* Card List */}
      {
        !profileDetails.wallet.length
          ? 
          <Typography>No cards added to wallet.</Typography>
          :
          profileDetails.wallet.map(card => {
            return (
              <>
                <Box key={card.id} sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, py: { xs: 1, sm: 2 }, px: 2, my: 2, bgcolor: 'background.paperContrast', borderRadius: 1 }}>
                  {/* Card Image */}
                  <Box component='img'
                    src={card.image}
                    alt={`Picture of ${card.name}`}
                    sx={{ width: '30%', display: { xs: 'none', md: 'inline' }, mr: { xs: 0, md: 1.5 } }} />
                    
                  {/* Card Details */}
                  <Box sx={{ display: 'flex',
                    flexDirection: 'column',
                    color: 'primary.contrastText',
                    bgcolor: 'background.paperContrast',
                    width: '100%',
                    px: 1,
                    borderRadius: 2 }}>

                    {/* Card Name */}
                    <Typography variant='subtitle2'>{card.name}</Typography>

                    {/* Annual Fee */}
                    <Box sx={{ textAlign: 'center', m: 1 }}>
                      <Typography variant='body1'>Annual Fee</Typography>
                      <Typography variant='body2'>${card.annual_fee}</Typography>
                    </Box>

                    {/* Foreign Transaction Fee */}
                    <Box sx={{ textAlign: 'center', m: 1 }}>
                      <Typography variant='body1'>Foreign Transaction Fee</Typography>
                      <Typography variant='subtitle1'>{card.foreign_fee}%</Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Divider */}
                <Divider flexItem sx={{ mx: 2 }} />
              </>
            )
          })
      }

    </Box>
  )
}

export default MyCards