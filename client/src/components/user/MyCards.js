import { Link } from 'react-router-dom'

// Helpers
import { deleteWalletCard } from '../helpers/creditCards'

// Icons
import CashBackIcon from '../creditCards/CashBackIcons'

// MUI Components
import { Box, Typography, Button, TextField, Divider, Alert, Slide, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Icon } from '../styles/MaterialUI'

const MyCards = ({ profileDetails, setProfileDetails, userId, token }) => {

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
                <Box key={card.id}>
                  <Box
                    sx={{ display: 'flex',
                      flexDirection: { xs: 'column', md: 'row' },
                      py: { xs: 1, sm: 2 },
                      px: 2,
                      my: 2,
                      bgcolor: 'background.paperContrast',
                      borderRadius: 1 }}>
                        
                    {/* Card Image */}
                    <Box component='img'
                      src={card.image}
                      alt={`Picture of ${card.name}`}
                      sx={{ width: '35%',
                        display: { xs: 'none', md: 'inline' },
                        mr: { xs: 0, md: 1.5 },
                        objectFit: 'contain',
                        borderRadius: 3 }} />
                      
                    {/* Card Details */}
                    <Box sx={{ display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      color: 'primary.contrastText',
                      bgcolor: 'background.paperContrast',
                      width: '100%',
                      px: 1,
                      borderRadius: 2,
                      textAlign: 'center' }}>

                      {/* Card Name */}
                      <Typography variant='subtitle2' sx={{ fontWeight: 'bold', mt: 1 }}>{card.issuer.name} {card.name}</Typography>

                      {/* Reward Icons */}
                      <Box sx={{ display: 'flex', mb: -.5 }}>
                        { card.cash_back_category.length > 0 ?
                          card.cash_back_category.map((category, index) => <CashBackIcon category={category} key={index} />) :
                          <CashBackIcon category={'None'} /> }
                      </Box>

                      {/* Key Details */}
                      <Box sx={{ display: 'flex', width: '100%' }}>

                        <TableContainer sx={{ my: 1, bgcolor: 'background.paperContrast', borderRadius: 1 }}>
                          <Table aria-label="simple table" size='small'>

                            <TableHead>
                              <TableRow>
                                <TableCell align="center" sx={{ fontSize: '.75rem', lineHeight: 1.2, p: .5 }}>Annual Fee</TableCell>
                                <TableCell align="center" sx={{ fontSize: '.75rem', lineHeight: 1.2, p: .5 }}>Base Rewards Rate</TableCell>
                                <TableCell align="center" sx={{ fontSize: '.75rem', lineHeight: 1.2, p: .5 }}>Foreign Transaction Fee</TableCell>
                              </TableRow>
                            </TableHead>
                            
                            <TableBody>
                              <TableRow>
                                <TableCell align="center" sx={{ fontSize: '.75rem', lineHeight: 1.2, p: .5 }}>${card.annual_fee}</TableCell>
                                <TableCell align="center" sx={{ fontSize: '.75rem', lineHeight: 1.2, p: .5 }}>{card.base_reward_rate}%</TableCell>
                                <TableCell align="center" sx={{ fontSize: '.75rem', lineHeight: 1.2, p: .5 }}>{card.foreign_fee}%</TableCell>
                              </TableRow>
                            </TableBody>

                          </Table>
                        </TableContainer>
                      </Box>

                      <Box>
                        <Button component={Link} to={`/cards/${card.id}`} size='small' sx={{ width: 'fit-content' }}>To Card Page</Button>
                        <Button color='error' onClick={() => {
                          deleteWalletCard(token, card.id, userId)
                          window.location.reload(false)
                        }} size='small'>Remove</Button>
                      </Box>

                    </Box>
                  </Box>

                  {/* Divider */}
                  <Divider flexItem sx={{ mx: 2 }} />
                </Box>
              )
            })
        }

      </Box>
    </Slide>
  )
}

export default MyCards