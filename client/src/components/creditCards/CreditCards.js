import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

// Helpers
import { getLocalToken } from '../helpers/auth'

// MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Icon from '@mui/material/Icon'
import Tooltip from '@mui/material/Tooltip'

// Error Handling
import Error from '../utilities/Error.js'
import Loading from '../utilities/Loading.js'

// Icons
import { creditRangeIcon, rewardIcon, iconStyle } from '../styles/Icons'
import HorizontalRuleRoundedIcon from '@mui/icons-material/HorizontalRuleRounded'

// Styling
import { flexCentered } from '../styles/Styling'

const CreditCards = () => {

  // Error Handling
  const [ loading, setLoading ] = useState(true)
  const [ error, setError ] = useState(false)

  // Token
  const token = getLocalToken()

  // Cards State
  const [ cards, setCards ] = useState(null)

  // Get Card Data
  useEffect(() => {
    const getCards = async () => {
      try {
        const { data } = await axios.get('/api/credit/')
        setCards(data)
      } catch (error) {
        console.log(error)
        setError(true)
      }
      setLoading(false)
    }
    getCards()
  }, [])

  return (
    <Box sx={{ flexCentered, textAlign: 'center', bgcolor: 'background.default', px: 5, pb: 10 }}>
      {/* Heading */}
      <Typography variant='h4' component='h2' sx={{ pt: 3, pb: 2, color: 'primary.contrastText' }}>Explore Credit Cards</Typography>
      <Grid container columnSpacing={3} rowSpacing={2}>
        { loading ? <Loading /> : error ? <Error /> : cards.map(card => {
          return (
            <Grid item key={card.id} xs={12} sm={6} md={4}>
              <Card sx={{ borderRadius: 5 }}>
                <CardContent sx={{ ...flexCentered, px: 0 }}>
                  {/* Card Name */}
                  <Typography variant='h6' sx={{ my: 1, py: 1, width: '100%', textAlign: 'center', bgcolor: 'primary.main' }}>{card.name}</Typography>

                  {/* Card Image */}
                  { token ?
                    <Box component={Link} to={`/cards/${card.id}`}>
                      <Box component='img' src={card.image} alt={`image of ${card.name} card`} sx={{ my: { xs: 1, lg: 2 }, height: '12rem', maxWidth: '95%', objectFit: 'contain' }} />
                    </Box> :
                    <Tooltip title='Login to View' placement='bottom' arrow>
                      <Box component='img' src={card.image} alt={`image of ${card.name} card`} sx={{ my: 2, height: '12rem', maxWidth: '95%', objectFit: 'contain' }} />
                    </Tooltip>
                  }
                  
                  
                  {/* Card Feature Overview */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2, width: '100%', py: 1, alignItems: 'center', bgcolor: 'primary.main', px: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-evenly', width: '100%', my: 1 }}>

                      {/* Credit Score */}
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant='body1' sx={{ lineHeight: 1.25, mb: .5 }}>Credit Score</Typography>
                        { creditRangeIcon(card.credit_range) }
                      </Box>
                      <Divider orientation="vertical" flexItem />

                      {/* Annual Fee */}
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant='body1' sx={{ lineHeight: 1.25 }}>Annual Fee</Typography>
                        <Typography variant='subtitle1'>${card.annual_fee}</Typography>
                      </Box>
                    </Box>
                    <Divider orientation="horizontal" flexItem />

                    {/* Rewards On */}
                    <Box sx={{ textAlign: 'center', mt: 1 }}>
                      <Typography variant='body1' sx={{ lineHeight: 1.25, my: .25 }}>Rewards On</Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                        { card.cash_back_category.length ?
                          card.cash_back_category.map((index, category) => <Box key={index}>{rewardIcon(category)}</Box>) :
                          <Box><Icon sx={ iconStyle }><HorizontalRuleRoundedIcon sx={{ p: .5 }} /></Icon></Box> }
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
              
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}

export default CreditCards