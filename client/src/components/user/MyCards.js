import { useState, useEffect } from 'react'

// MUI Components
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Slide from '@mui/material/Slide'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

const MyCards = ({ profileDetails, setProfileDetails }) => {

  useEffect(() => {
    console.log(profileDetails.wallet)
  })

  return (
    <Slide in={true} direction='up'>
      <Box id='my-cards'
        sx={{
          width: { xs: '100%', sm: '75%' },
          maxWidth: '850px',
          display: 'flex',
          flexDirection: 'column',
          ml: { xs: 0, sm: 3.5 },
          bgcolor: 'background.paper',
          py: 5,
          px: { xs: 2.5, sm: 5 },
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
                      sx={{ width: '35%', display: { xs: 'none', md: 'inline' }, mr: { xs: 0, md: 1.5 }, objectFit: 'contain' }} />
                      
                    {/* Card Details */}
                    <Box sx={{ display: 'flex',
                      flexDirection: 'column',
                      color: 'primary.contrastText',
                      bgcolor: 'background.paperContrast',
                      width: '100%',
                      px: 1,
                      borderRadius: 2,
                      textAlign: 'center' }}>

                      {/* Card Name */}
                      <Typography variant='subtitle2'>{card.name}</Typography>

                      {/* Key Details */}
                      <Box sx={{ display: 'flex' }}>

                        <TableContainer>
                          <Table sx={{ width: '100%' }} aria-label="simple table" size='small'>
                            <TableHead>
                              <TableRow>
                                <TableCell align="center" sx={{ fontSize: '.75rem', lineHeight: 1.2, p: .5 }}>Annual Fee</TableCell>
                                <TableCell align="center" sx={{ fontSize: '.75rem', lineHeight: 1.2, p: .5 }}>Base Rewards Rate</TableCell>
                                <TableCell align="center" sx={{ fontSize: '.75rem', lineHeight: 1.2, p: .5 }}>Foreign Transaction Fee</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableCell align="center" sx={{ fontSize: '.75rem', lineHeight: 1.2, p: .5 }}>${card.annual_fee}</TableCell>
                              <TableCell align="center" sx={{ fontSize: '.75rem', lineHeight: 1.2, p: .5 }}>{card.base_reward_rate}%</TableCell>
                              <TableCell align="center" sx={{ fontSize: '.75rem', lineHeight: 1.2, p: .5 }}>{card.foreign_fee}%</TableCell>
                            </TableBody>
                          </Table>
                        </TableContainer>

                        {/* Annual Fee */}
                        {/* <Box sx={{ textAlign: 'center', m: 1 }}>
                          <Typography variant='body1'>Annual Fee</Typography>
                          <Typography variant='body2'>${card.annual_fee}</Typography>
                        </Box> */}

                        {/* Foreign Transaction Fee */}
                        {/* <Box sx={{ textAlign: 'center', m: 1 }}>
                          <Typography variant='body1'>Foreign Transaction Fee</Typography>
                          <Typography variant='body2'>{card.foreign_fee}%</Typography>
                        </Box> */}

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
    </Slide>
  )
}

export default MyCards