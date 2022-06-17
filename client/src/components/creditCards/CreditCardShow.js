import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

// Error Handling
import Error from '../utilities/Error.js'
import Loading from '../utilities/Loading.js'

// Helper Functions
import { getLocalToken, getPayload } from '../helpers/auth'
import { handleWalletButton } from '../helpers/creditCards'

// MUI Components
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import Icon from '@mui/material/Icon'

// Icons
import { creditRangeIcon, rewardIcon, iconStyle } from '../styles/Icons'
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded'
import ThumbDownRoundedIcon from '@mui/icons-material/ThumbDownRounded'
import HorizontalRuleRoundedIcon from '@mui/icons-material/HorizontalRuleRounded'

// Styling
import { flexCentered, flexRowCentered } from '../styles/Styling'

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
            <ListItemAvatar>
              <Avatar sx={{ boxShadow: 2, bgcolor: 'secondary.main', width: { xs: '1.5rem', md: '3rem' }, height: { xs: '1.5rem', md: '3rem' } }}>
                { type === 'pro' ? <ThumbUpRoundedIcon sx={{ color: 'limegreen', width: '65%' }} /> : <ThumbDownRoundedIcon sx={{ color: 'tomato', width: '65%' }} /> }
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={cardData[`${type}_${i}`]} primaryTypographyProps={{ variant: 'body2' }} />
          </ListItem>
        )
      }
    }
    return elements
  }

  return (
    <>
      { loading ? <Loading /> : errors ? <Error /> :
        <Box sx={{ minHeight: '100vh',
          height: 'fit-content',
          width: '100vw',
          bgcolor: 'background.default',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'center', md: 'flex-start' },
          py: { xs: 5, md: 10 },
        }}>
          <Box id='card-tile'
            sx={{ ...flexCentered, bgcolor: 'background.default', borderRadius: 15, width: { xs: '85vw', md: '28vw' }, mx: 3, height: 'fit-content' }}>
            {/* Card Name */}
            <Typography
              variant='h6'
              sx={{ mt: 3, py: 1, width: '100%', textAlign: 'center', bgcolor: 'secondary.dark', color: 'primary.contrastText', borderRadius: 2 }}>{cardData.name}</Typography>

            {/* Card Image */}
            <Box
              component='img'
              src={cardData.image}
              alt={`image of ${cardData.name} card`}
              sx={{ mt: 3, height: '12rem', objectFit: 'contain', maxWidth: '90%', borderRadius: 3.5, boxShadow: 3 }} />

            {/* Reward Icons */}
            <Box sx={{ ...flexRowCentered, flexWrap: 'wrap', my: 1 }}>
              { cardData.cash_back_category.length ?
                cardData.cash_back_category.map((index, category) => <Box key={index} sx={{ color: 'secondary.contrastText' }}>{rewardIcon(category)}</Box>) :
                <Box><Icon sx={ iconStyle }><HorizontalRuleRoundedIcon sx={{ p: .5 }} /></Icon></Box> }
            </Box>
                        
            {/* Add to Wallet Button */}
            <Button
              color='secondary'
              variant='contained'
              onClick={() => handleWalletButton(token, cardId, payload.sub, addButtonText, setAddButtonText)}>{addButtonText}</Button>
                        
            {/* Link to Issuer Site */}
            <Typography
              component='a'
              variant='caption'
              href={cardData.link}
              target='__blank__'
              sx={{ mt: 1, mb: 6, color: 'primary.contrastText' }}>Head to Issuer Site</Typography>
          </Box>

          <Box id='main-section' sx={{ width: { xs: '85vw', md: '72vw' }, px: 3, mr: { xs: 0, md: 3 } }}>
            {/* Card Details */}
            <Box id='card-details'
              sx={{ display: 'flex',
                flexWrap: 'wrap',
                bgcolor: 'primary.dark',
                color: 'white',
                justifyContent: 'space-evenly',
                p: 1,
                borderRadius: 5,
              }}>
              
              {/* Credit Score */}
              <Box sx={{ textAlign: 'center', m: 1 }}>
                <Typography variant='body1'>Credit Score</Typography>
                <Typography variant='subtitle1' sx={{ mt: .35 }}>{creditRangeIcon(cardData.credit_range)}</Typography>
              </Box>

              <Divider orientation="vertical" variant="middle" flexItem />

              {/* Annual Fee */}
              <Box sx={{ textAlign: 'center', m: 1 }}>
                <Typography variant='body1'>Annual Fee</Typography>
                <Typography variant='subtitle1'>${cardData.annual_fee}</Typography>
              </Box>

              <Divider orientation="vertical" variant="middle" flexItem />

              {/* Foreign Transaction Fee */}
              <Box sx={{ textAlign: 'center', m: 1 }}>
                <Typography variant='body1'>Foreign Transaction Fee</Typography>
                <Typography variant='subtitle1'>{cardData.foreign_fee}%</Typography>
              </Box>

              <Divider orientation="vertical" variant="middle" flexItem />

              {/* Regular APR */}
              <Box sx={{ textAlign: 'center', m: 1 }}>
                <Typography variant='body1'>Regular APY</Typography>
                <Typography variant='subtitle1'>{cardData['regular_APR_min']} - {cardData['regular_APR_max']}%</Typography>
              </Box>
            </Box>

            {/* Pros and Cons */}
            <Box id='pros-cons' sx={{ px: 1, py: 3, my: 4, color: 'primary.contrastText', bgcolor: 'background.paperContrast', borderRadius: 5 }}>
              <Box sx={{ width: '100%', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-evenly' }}>
                
                {/* Pros */}
                <Box sx={{ width: { xs: '95%', md: '50%' }, mx: { xs: 1, md: 2 } }}>
                  <Typography variant='h6' >Pros</Typography>
                  <List sx={{ bgcolor: 'background.paperMoreContrast' }}>
                    { displayFeatures('pro') }
                  </List>
                </Box>

                {/* Cons */}
                <Box sx={{ width: { xs: '95%', md: '50%' }, mx: { xs: 1, md: 2 }, mt: { xs: 2, md: 0 } }}>
                  <Typography variant='h6'>Cons</Typography>
                  <List sx={{ bgcolor: 'background.paperMoreContrast' }}>
                    { displayFeatures('con') }
                  </List>
                </Box>

              </Box>
            </Box>
          </Box>
        </Box>
      }
    </>
    
  )
}

export default CreditCardShow