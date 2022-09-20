import { useState, useEffect } from 'react'

// Components
import CreditCardFilters from './CreditCardFilters'
import CreditCardTile from './CreditCardTile'

// Helpers
import { getCards } from '../helpers/creditCards'

// MUI Components
import { Box, Grid, Typography, Zoom } from '../styles/MaterialUI'

// Error Handling
import Error from '../utilities/Error.js'
import Loading from '../utilities/Loading.js'

// Styling
import { flexCentered } from '../styles/styling'

const CreditCards = () => {

  // Error Handling
  const [ loading, setLoading ] = useState(true)
  const [ error, setError ] = useState(false)

  // Cards State
  const [ cards, setCards ] = useState(null)

  // Search and Filter
  const [ filteredCards, setFilteredCards ] = useState([])
  const [ searchTerm, setSearchTerm ] = useState('')
  const [ cardFilters, setCardFilters ] = useState({
    annualFee: '',
    creditScore: '',
  })

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
      })

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
      <CreditCardFilters cardFilters={cardFilters} setCardFilters={setCardFilters} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <Grid container columnSpacing={3} rowSpacing={2}>
        { loading ? <Loading /> : error ? <Error /> : (filteredCards.length ? filteredCards : cards).map(card => {
          return (
            <Zoom key={card.id} in={true} timeout={{ enter: 500 }}>
              <Grid item xs={12} sm={6} md={4}>
                <CreditCardTile card={card} />
              </Grid>
            </Zoom>
          )
        })}
      </Grid>
    </Box>
  )
}

export default CreditCards