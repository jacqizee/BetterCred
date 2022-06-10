import { useState, useEffect } from 'react'
import axios from 'axios'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import { flexCentered } from './styles/Styling'

const CreditCards = () => {

  const cardFeature = {
    mx: 2,
    textAlign: 'center',
  }

  const [ loading, setLoading ] = useState(true)
  const [ error, setError ] = useState(false)
  const [ cards, setCards ] = useState(null)

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
    <Box sx={{ flexCentered, bgcolor: 'background.default', px: 3 }}>
      <Typography variant='h4' component="h2">Explore Credit Cards</Typography>
      <Grid container spacing={2}>
        { loading ? <h1>Loading</h1> : error ? <h1>Error</h1> : cards.map(card => {
          return (
            <Grid item key={card.id} xs={12} sm={6} md={4}>
              <Card>
                <CardContent sx={{ ...flexCentered, px: 0 }}>
                  {/* Card Name */}
                  <Typography variant='h6' sx={{ my: 1, py: 1, width: '100%', textAlign: 'center', bgcolor: 'secondary.main' }}>{card.name}</Typography>

                  {/* Card Image */}
                  <Box component='img' src={card.image} alt={`image of ${card.name} card`} sx={{ width: '65%' }} />

                  {/* Card Feature Overview */}
                  <Box sx={{ display: 'flex', my: 2 }}>
                    <Box sx={ cardFeature }>
                      <Typography variant='subtitle1'>Credit Score</Typography>
                    </Box>
                    <Box sx={ cardFeature }>
                      <Typography variant='subtitle1'>Rewards On</Typography>
                    </Box>
                    <Box sx={ cardFeature }>
                      <Typography variant='subtitle1'>Annual Fee</Typography>
                      <Typography variant='subtitle2'>{card.annual_fee}</Typography>
                    </Box>
                  </Box>
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