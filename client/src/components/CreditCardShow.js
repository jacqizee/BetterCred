import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

// MUI Components
import Box from '@mui/material/Box'

const CreditCardShow = () => {

  const { cardId } = useParams()
  const [ loading, setLoading ] = useState(true)
  const [ errors, setErrors ] = useState(false)

  useEffect(() => {
    const getCard = async () => {
      try {
        const { data } = await axios.get(`/api/credit/${cardId}/`, {
          headers: {
            'Authorization': `Bearer ${window.localStorage.getItem('bettercred')}`,
          },
        })
        console.log(data)
      } catch (error) {
        console.log(error)
        setErrors(true)
      }
      setLoading(false)
    }
    getCard()
  }, [])
  
  return (
    <Box>
      <h1> CreditCardShow </h1>
      <p>{cardId}</p>
    </Box>
  )
}

export default CreditCardShow