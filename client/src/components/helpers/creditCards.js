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