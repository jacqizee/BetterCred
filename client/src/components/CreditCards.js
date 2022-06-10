import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'

import Error from './utilities/Error.js'
import Loading from './utilities/Loading.js'

import { flexCentered } from './styles/Styling'

const CreditCards = () => {

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
    <Box sx={{ flexCentered, textAlign: 'center', bgcolor: 'background.default', px: 5, pb: 10 }}>
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
                  <Box component='img' src={card.image} alt={`image of ${card.name} card`} sx={{ width: '65%', my: 2 }} />

                  {/* Card Feature Overview */}
                  <Box sx={{ display: 'flex', mb: 2, width: '100%', py: 2, justifyContent: 'space-around', bgcolor: 'primary.main', px: 2 }}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant='body1' sx={{ lineHeight: 1.25 }}>Credit Score</Typography>
                    </Box>
                    <Divider orientation="vertical" flexItem></Divider>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant='body1' sx={{ lineHeight: 1.25 }}>Rewards On</Typography>
                    </Box>
                    <Divider orientation="vertical" flexItem></Divider>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant='body1' sx={{ lineHeight: 1.25 }}>Annual Fee</Typography>
                      <Typography variant='subtitle1'>${card.annual_fee}</Typography>
                    </Box>
                  </Box>
                  <Button component={Link} to={`/cards/${card.id}`} variant='contained' color='secondary' sx={{ textTransform: 'none' }}>Learn More</Button>
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