import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

// Error Handling
import Error from '../utilities/Error.js'
import Loading from '../utilities/Loading.js'

// Helper Functions
import { getLocalToken, getPayload } from '../helpers/auth'

// MUI Components
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import Icon from '@mui/material/Icon'
import Grid from '@mui/material/Grid'

// Icons
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded'
import ThumbDownRoundedIcon from '@mui/icons-material/ThumbDownRounded'

// Styling
import { flexCentered } from '../styles/Styling'

const CreditCardShow = () => {

  const { cardId } = useParams()
  const [ cardData, setCardData ] = useState(false)
  const [ addButtonText, setAddButtonText ] = useState('Add to Wallet')

  // Error Handling
  const [ loading, setLoading ] = useState(true)
  const [ errors, setErrors ] = useState(false)

  // Auth Helpers
  const token = getLocalToken()
  const payload = getPayload()

  // Get Card Data
  useEffect(() => {
    const getCard = async () => {
      try {
        const { data } = await axios.get(`/api/credit/${cardId}/`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
        setCardData(data)
        if (data.users.length > 0) {
          data.users.forEach(user => user.id === payload.sub && setAddButtonText('Remove from Wallet'))
        }
        console.log(data)
      } catch (error) {
        console.log(error.response.data.detail)
        setErrors(true)
      }
      setLoading(false)
    }
    getCard()
  }, [])

  // Map Pros and Cons with Icons
  const displayFeatures = (type) => {
    const elements = []
    for (let i = 1; i < 4; i++) {
      if (cardData[`${type}_${i}`]){
        elements.push(
          <ListItem key={i}>
            <ListItemIcon>
              { type === 'pro' ? <ThumbUpRoundedIcon sx={{ color: 'green' }} /> : <ThumbDownRoundedIcon sx={{ color: 'darkred' }} /> }
            </ListItemIcon>
            <ListItemText primary={cardData[`${type}_${i}`]} />
          </ListItem>
        )
      }
    }
    return elements
  }

  // Add Card to User Wallet
  const handleWalletButton = async () => {
    
    const addWalletCard = async () => {
      await axios.post(`/api/auth/profile/${payload.sub}/wallet/`, {
        cardId: cardId,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      setAddButtonText('Remove from Wallet')
    }

    const deleteWalletCard = async () => {
      await axios.delete(`/api/auth/profile/${payload.sub}/wallet/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        data: {
          cardId: cardId,
        },
      })
      setAddButtonText('Add to Wallet')
    }

    try {
      addButtonText === 'Add to Wallet' ? addWalletCard() : deleteWalletCard()
    } catch (error) {
      console.log(error)
      console.log(error.response)
    }
  }
  
  return (
    <Box>
      { loading ? <Loading /> : errors ? <Error /> :
        <Grid container sx={{ mt: 5 }}>
          <Grid item xs={12} md={4} sx={{ ...flexCentered, bgcolor: 'background.default', borderRadius: 15, my: 5 }}>
            {/* Card Name */}
            <Typography variant='h6' sx={{ color: 'primary.contrastText', width: '100%', textAlign: 'center', mt: 3 }}>{cardData.name}</Typography>
            
            {/* Card Image */}
            <Box component='img' src={cardData.image} alt={`image of ${cardData.name} card`} sx={{ my: 3, height: '12rem', objectFit: 'contain', maxWidth: '100%' }} />
            
            {/* Add to Wallet Button */}
            <Button color='secondary' variant='contained' onClick={handleWalletButton}>{addButtonText}</Button>
            
            {/* Link to Issuer Site */}
            <Typography
              component='a'
              variant='caption'
              href={cardData.link}
              target='__blank__'
              sx={{ mt: 1, mb: 3 }}>Head to Issuer Site</Typography>
          </Grid>
          <Grid item xs={12} md={8} sx={{ ...flexCentered, bgcolor: 'blue', borderRadius: 15 }}>
            
            {/* Inner Box */}
            <Box sx={{ height: '65%', width: '100%', bgcolor: 'primary.main', m: 0 }}>
              <Grid container spacing={2} sx={{ width: '100%' }}>
                <Grid item xs={6}>
                  <Typography variant='h6' >Pros</Typography>
                  <List>
                    { displayFeatures('pro') }
                  </List>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant='h6'>Cons</Typography>
                  { displayFeatures('con') }
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      }
    </Box>
    
  )
}

export default CreditCardShow