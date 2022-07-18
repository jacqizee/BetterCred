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
import Zoom from '@mui/material/Zoom'
import TextField from '@mui/material/TextField'
import Chip from '@mui/material/Chip'

// Error Handling
import Error from '../utilities/Error.js'
import Loading from '../utilities/Loading.js'

// Icons
import { creditRangeIcon, rewardIcon, iconStyle } from '../styles/Icons'
import HorizontalRuleRoundedIcon from '@mui/icons-material/HorizontalRuleRounded'
import SearchIcon from '@mui/icons-material/Search'

// Styling
import { flexCentered, flexRowCentered } from '../styles/Styling'

const CreditCards = () => {

  // Error Handling
  const [ loading, setLoading ] = useState(true)
  const [ error, setError ] = useState(false)

  // Token
  const token = getLocalToken()

  // Cards State
  const [ cards, setCards ] = useState(null)

  // Search and Filter
  const [ filteredCards, setFilteredCards ] = useState([])
  const [ searchTerm, setSearchTerm ] = useState('')

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  // When search term is changed, filter credit cards
  useEffect(() => {
    if (!cards) return  
    const filterCards = searchTerm.length ? cards.filter(card => {
      return (
        card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.issuer.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }) : cards
    setFilteredCards(filterCards)
  }, [searchTerm])

  // Get Card Data
  useEffect(() => {
    const getCards = async () => {
      try {
        const { data } = await axios.get('/api/credit/')
        setCards(data)
        console.log(data)
      } catch (error) {
        console.log(error)
        setError(true)
      }
      setLoading(false)
    }
    getCards()
  }, [])

  return (
    <Box sx={{ flexCentered, textAlign: 'center', bgcolor: 'background.default', px: 5, pb: 10, minHeight: 'calc(100vh - 60px)' }}>
      {/* Heading */}
      <Typography variant='h4' component='h2' sx={{ pt: 3.5, color: 'primary.contrastText' }}>Explore Credit Cards</Typography>
      <Typography variant='subtitle2' sx={{ mb: 2, color: 'primary.contrastText' }}>Find a credit card that meets your credit range and matches your reward preferences</Typography>
      
      {/* Filters */}
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
        {/* Search Box */}
        <Box sx={{ display: 'flex', alignItems: 'flex-end', color: 'primary.contrastText' }}>
          <SearchIcon sx={{ my: 0.5, mr: 1 }} />
          <TextField
            name='search-field'
            value={searchTerm}
            label='Search'
            variant='standard'
            onChange={handleSearch}
          />
        </Box>
      </Box>

      <Grid container columnSpacing={3} rowSpacing={2}>
        { loading ? <Loading /> : error ? <Error /> : ( searchTerm.length ? filteredCards : cards).map(card => {
          return (
            <Zoom key={card.id} in={true} timeout={{ enter: 500 }}>
              <Grid item xs={12} sm={6} md={4}>
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
                        card.cash_back_category.map((category, index) => <Box key={index} sx={{ color: 'secondary.contrastText' }}>{rewardIcon(category)}</Box>) :
                        <Box><Icon sx={ iconStyle }><HorizontalRuleRoundedIcon sx={{ p: .5 }} /></Icon></Box> }
                    </Box>
                    
                    {/* Card Feature Overview */}
                    <Box sx={{ ...flexCentered, mb: 2, width: '100%', bgcolor: 'primary.light', px: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-evenly', width: '100%', my: 1, color: 'secondary.contrastText' }}>

                        {/* Credit Score */}
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant='body1' sx={{ lineHeight: 1.25, mb: .5 }}>Credit Score</Typography>
                          { creditRangeIcon(card.credit_range) }
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
                
              </Grid>
            </Zoom>
          )
        })}
      </Grid>
    </Box>
  )
}

export default CreditCards