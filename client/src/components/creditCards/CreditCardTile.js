import { Link } from 'react-router-dom'

import { getLocalToken } from '../helpers/auth'

// Styling
import { flexCentered, flexRowCentered } from '../styles/styling'

// MUI Elements
import { Box, Card, CardContent, Typography, Button, Divider, Tooltip, Chip } from '../styles/MaterialUI'

// Icons
import CreditRangeIcon from '../icons/CreditRangeIcon'
import CashBackIcon from '../icons/CashBackIcons'

const CreditCardTile = ({ card }) => {
  // Token
  const token = getLocalToken()

  return (
    <Card sx={{ borderRadius: 5 }}>
      <CardContent sx={{ ...flexCentered, px: 0 }}>
        {/* Card Name */}
        <Typography variant='h6' sx={{ my: 1, py: 1, width: '100%', textAlign: 'center', bgcolor: 'primary.main', boxShadow: 2 }}>
          {card.name}
        </Typography>

        {/* Card Image */}
        { token ?
          <Box component={Link} to={`/cards/${card.id}`}>
            <Box component='img' src={card.image} alt={`image of ${card.name} card`} sx={{ mt: 1, height: '12rem', maxWidth: '95%', objectFit: 'contain' }} />
          </Box> :
          <Tooltip title='Login to View' placement='bottom' arrow>
            <Box component='img' src={card.image} alt={`image of ${card.name} card`} sx={{ mt: 1, height: '12rem', maxWidth: '95%', objectFit: 'contain' }} />
          </Tooltip>
        }

        {/* Reward Icons */}
        <Box sx={{ ...flexRowCentered, flexWrap: 'wrap', borderRadius: 10, minWidth: '50%', mb: 1 }}>
          { card.cash_back_category.length > 0 ?
            card.cash_back_category.map((category, index) => <CashBackIcon category={category} key={index} />) :
            <CashBackIcon category={'None'} /> }
        </Box>
        
        {/* Card Feature Overview */}
        <Box sx={{ ...flexCentered, mb: 2, width: '100%', bgcolor: 'primary.light', px: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-evenly', width: '100%', my: 1, color: 'secondary.contrastText' }}>

            {/* Credit Score */}
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant='body1' sx={{ lineHeight: 1.25, mb: .5 }}>Credit Score</Typography>
              <CreditRangeIcon creditRange={card.credit_range} />
            </Box>
            <Divider orientation="vertical" flexItem />

            {/* Annual Fee */}
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant='body1' sx={{ lineHeight: 1.25, mb: .5 }}>Annual Fee</Typography>
              <Chip label={`$${card.annual_fee}`} color='primary' />
            </Box>
          </Box>

        </Box>

        {/* Learn More */}
        { token ?
          <Button component={Link} to={`/cards/${card.id}`} variant='contained' color='secondary' sx={{ textTransform: 'none' }}>Learn More</Button> :
          <Tooltip title='Login to View' placement='bottom' arrow>
            <Button variant='contained' color='secondary' sx={{ textTransform: 'none' }}>Learn More</Button>
          </Tooltip>
        }
      </CardContent>
    </Card>
  )
}

export default CreditCardTile