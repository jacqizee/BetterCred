import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

// Error Handling
import Error from '../utilities/Error.js'
import Loading from '../utilities/Loading.js'

// Helper Functions
import { getLocalToken, getPayload, handleLogOut } from '../helpers/auth'
import { handleWalletButton, displayFeatures } from '../helpers/creditCards'

// MUI Components
import { Box, Typography, Icon, Button, List } from '../styles/MaterialUI'

// Icons
import { creditRangeIcon, iconStyle } from '../styles/Icons'
import CashBackIcon from './CashBackIcons'
import bgDark from '../../assets/background-dark.webp'
import bgLight from '../../assets/background-light.jpeg'

// Styling
import { flexCentered, flexRowCentered } from '../styles/Styling'

const CreditCardShow = ({ mode }) => {

  const { cardId } = useParams()
  const [ cardData, setCardData ] = useState(false)
  const [ addButtonText, setAddButtonText ] = useState('Add to Wallet')

  // Error Handling
  const [ loading, setLoading ] = useState(true)
  const [ errors, setErrors ] = useState(false)

  // Auth Helpers
  const token = getLocalToken()
  const payload = getPayload()

  const cardStats = {
    'Credit Score': creditRangeIcon(cardData.credit_range),
    'Annual Fee': `$${cardData.annual_fee}`,
    'Foreign Transaction Fee': `${cardData.foreign_fee}%`,
    'Regular APY': `${cardData['regular_APR_min']} - ${cardData['regular_APR_max']}%`,
  }

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
        setErrors(true)
        handleLogOut()
      }
      setLoading(false)
    }
    getCard()
  }, [])

  return (
    <>
      { loading ? <Loading /> : errors ? <Error /> :
        <Box sx={{ minHeight: '95vh',
          height: 'fit-content',
          width: '100vw',
          background: `${ mode === 'dark' ?
            `linear-gradient(
              rgba(0, 0, 0, 0.15), 
              rgba(0, 0, 0, 0.15)
            ), url(${bgDark})` :
            `linear-gradient(
              rgba(256, 256, 256, 0.45), 
              rgba(256, 256, 256, 0.45)
            ), url(${bgLight})`}`,
          backgroundSize: 'cover',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'center', md: 'flex-start' },
          pt: { xs: 5, md: 10 },
        }}>
          <Box id='card-tile'
            sx={{ ...flexCentered, bgcolor: 'background.paperContrast', pb: 3, borderRadius: 8, width: { xs: '85vw', md: '28vw' }, mx: 3, height: 'fit-content' }}>
            {/* Card Name */}
            <Typography
              variant='h6'
              sx={{ px: 2, py: 1, width: '100%', textAlign: 'center', bgcolor: 'primary.main', color: 'primary.contrastText', borderRadius: '12px 12px 0 0' }}>{cardData.name}</Typography>

            {/* Card Image */}
            <Box
              component='img'
              src={cardData.image}
              alt={`image of ${cardData.name} card`}
              sx={{ mt: 3, height: '12rem', objectFit: 'contain', maxWidth: '90%', borderRadius: 3.5, boxShadow: 3 }} />

            {/* Reward Icons */}
            <Box sx={{ ...flexRowCentered, flexWrap: 'wrap', my: 1 }}>
              { cardData.cash_back_category.length > 0 ?
                cardData.cash_back_category.map((category, index) => <CashBackIcon category={category} key={index} />) :
                <CashBackIcon category={'None'} /> }
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
              sx={{ mt: 1, color: 'primary.contrastText' }}>Head to Issuer Site</Typography>
          </Box>

          <Box id='main-section' sx={{ width: { xs: '85vw', md: '72vw' }, px: 3, mr: { xs: 0, md: 3 } }}>
            {/* Card Details */}
            <Box id='card-details'
              sx={{ display: 'flex',
                flexWrap: 'wrap',
                color: 'white',
                justifyContent: 'space-evenly',
                my: { xs: 2, md: 0 },
              }}>
            
              {/* Card Stats */}
              { Object.keys(cardStats).map((key, i) => (
                <Box key={i} sx={{ textAlign: 'center', flexGrow: 1, m: 1, bgcolor: 'primary.dark', py: 1, borderRadius: 2 }}>
                  <Typography variant='body1'>{key}</Typography>
                  <Typography variant='subtitle1' sx={{ mt: .35 }}>{cardStats[key]}</Typography>
                </Box>
              )) }
            </Box>

            {/* Pros and Cons */}
            <Box id='pros-cons' sx={{ px: 1, py: 3, my: 2, color: 'primary.contrastText', bgcolor: 'background.paperContrast', borderRadius: 5 }}>
              <Box sx={{ width: '100%', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'center', md: 'flex-start' }, justifyContent: 'space-evenly' }}>
                
                {/* Pros */}
                <Box sx={{ width: { xs: '95%', md: '50%' }, mx: { xs: 1, md: 2 } }}>
                  <Typography variant='h6' >Pros</Typography>
                  <List sx={{ bgcolor: 'background.paperMoreContrast' }}>
                    { displayFeatures('pro', cardData) }
                  </List>
                </Box>

                {/* Cons */}
                <Box sx={{ width: { xs: '95%', md: '50%' }, mx: { xs: 1, md: 2 }, mt: { xs: 2, md: 0 } }}>
                  <Typography variant='h6'>Cons</Typography>
                  <List sx={{ bgcolor: 'background.paperMoreContrast' }}>
                    { displayFeatures('con', cardData) }
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