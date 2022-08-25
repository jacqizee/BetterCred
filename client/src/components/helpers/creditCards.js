import axios from 'axios'

export const deleteWalletCard = async (token, cardId, userId) => {
  await axios.delete(`/api/auth/profile/${userId}/wallet/`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    data: {
      cardId: cardId,
    },
  })
}

export const addWalletCard = async (token, cardId, userId) => {
  await axios.post(`/api/auth/profile/${userId}/wallet/`, {
    cardId: cardId,
  }, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
}

export const handleWalletButton = (token, cardId, userId, addButtonText, setAddButtonText) => {
  try {
    if (addButtonText === 'Add to Wallet') {
      addWalletCard(token, cardId, userId)
      setAddButtonText('Remove from Wallet')
    } else {
      deleteWalletCard(token, cardId, userId)
      setAddButtonText('Add to Wallet')
    }
  } catch (error) {
    console.log(error.response)
  }
}

import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import ListItemText from '@mui/material/ListItemText'
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded'
import ThumbDownRoundedIcon from '@mui/icons-material/ThumbDownRounded'

export const displayFeatures = (type, cardData) => {
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

export const getCards = async (setError, setLoading, setCards) => {
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