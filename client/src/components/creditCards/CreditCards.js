import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// Helpers
import { getLocalToken } from '../helpers/auth'
import { getCards } from '../helpers/creditCards'

// MUI Components
import { Box, Grid, Card, CardContent, Typography, Button, Divider, Icon, Tooltip, Zoom, TextField, Chip, FormControl, InputLabel,
  MenuItem, Select } from '../styles/MaterialUI'

// Error Handling
import Error from '../utilities/Error.js'
import Loading from '../utilities/Loading.js'

// Icons
import { creditRangeIcon } from '../styles/Icons'
import SearchIcon from '@mui/icons-material/Search'
import CashBackIcon from './CashBackIcons'

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
  const [ cardFilters, setCardFilters ] = useState({
    annualFee: '',
    creditScore: '',
  })

  const handleFilterClick = (e) => {
    if (cardFilters[e.target.name] === e.target.value) {
      setCardFilters({ ...cardFilters, [e.target.name]: '' })
    } else {
      setCardFilters({ ...cardFilters, [e.target.name]: e.target.value })
    }
  }

  // When search term is changed, filter credit cards
  useEffect(() => {
    if (!cards) return

    const { annualFee, creditScore } = cardFilters

    let sorted = [...cards]

    if (searchTerm.length) {
      const filtered = sorted.filter(card => {
        return (
          card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          card.issuer.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      }).length

      filtered.length ? sorted = filtered : ''
    }

    if (annualFee !== '') {
      if (annualFee === 'low') {
        sorted.sort((a, b) => a.annual_fee - b.annual_fee)
      } else {
        sorted.sort((a, b) => b.annual_fee - a.annual_fee)
      }
    }

    if (creditScore !== '') {
      sorted = sorted.filter(card => card.credit_range === creditScore)
    }

    setFilteredCards(sorted)
  }, [searchTerm, cardFilters])

  // Get Card Data
  useEffect(() => {
    getCards(setError, setLoading, setCards)
  }, [])

  return (
    <Box sx={{ flexCentered, textAlign: 'center', bgcolor: 'background.default', px: 5, pb: 10, minHeight: 'calc(100vh - 60px)' }}>
      {/* Heading */}
      <Typography variant='h4' component='h2' sx={{ pt: 3.5, color: 'primary.contrastText' }}>Explore Credit Cards</Typography>
      <Typography variant='subtitle2' sx={{ mb: 2, color: 'primary.contrastText' }}>Find a credit card that meets your credit range and matches your reward preferences</Typography>
      
      {/* Filters */}
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        {/* Search Box */}
        <Box sx={{ display: 'flex', alignItems: 'flex-end', color: 'primary.contrastText', mr: 2 }}>
          <SearchIcon sx={{ my: 0.5, mr: 1 }} />
          <TextField
            name='search-field'
            value={searchTerm}
            label='Search'
            variant='outlined'
            size='small'
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>

        {/* Sort by Annual Fee */}
        <FormControl sx={{ width: 'fit-contents', mr: 2 }}>
          <Select
            labelId="sort-fee"
            displayEmpty
            id="sort-fee"
            name="annualFee"
            value={cardFilters.annualFee}
            size='small'
            onChange={handleFilterClick}
          >
            <MenuItem value={''} selected disabled>Annual Fee</MenuItem>
            <MenuItem value={'low'}>Low to High</MenuItem>
            <MenuItem value={'high'}>High to Low</MenuItem>
          </Select>
        </FormControl>

        {/* Filter by Credit Score */}
        <FormControl sx={{ width: 'fit-contents', mr: 2 }}>
          <Select
            labelId="filter-credit"
            displayEmpty
            id="filter-credit"
            value={cardFilters.creditScore}
            name="creditScore"
            size='small'
            onChange={handleFilterClick}
          >
            <MenuItem value={''} selected disabled>Credit Score</MenuItem>
            <MenuItem value={'Bad'}>Bad</MenuItem>
            <MenuItem value={'Fair'}>Fair</MenuItem>
            <MenuItem value={'Good'}>Good</MenuItem>
            <MenuItem value={'Excellent'}>Excellent</MenuItem>
          </Select>
        </FormControl>
        
        <Button onClick={() => setCardFilters({
          annualFee: '',
          creditScore: '',
        })}>Clear</Button>

      </Box>

      <Grid container columnSpacing={3} rowSpacing={2}>
        { loading ? <Loading /> : error ? <Error /> : (filteredCards.length ? filteredCards : cards).map(card => {
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
                        card.cash_back_category.map((category, index) => <CashBackIcon category={category} key={index} />) :
                        <CashBackIcon category={'None'} /> }
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