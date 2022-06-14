import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

// Helper Functions
import { getPayload, getLocalToken, confirmUser } from '../helpers/auth.js'

// Components
import Loading from '../utilities/Loading'
import Error from '../utilities/Error'

// MUI Components
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import Icon from '@mui/material/Icon'

const Profile = () => {

  const nav = useNavigate()

  const [ loading, setLoading ] = useState(true)
  const [ error, setError ] = useState(false)
  const [ submitted, setSubmitted ] = useState(false)

  const [ profileDetails, setProfileDetails ] = useState({
    password: '',
    password_confirmation: '',
  })
  const { userId } = useParams()

  const token = getLocalToken()
 
  useEffect(() => {
    // Confirm User is Logged In + Owner
    if (!confirmUser(userId)) {
      nav('/cards')
    }
    
    // Get Profile Details
    const getProfileDetails = async () => {
      try {
        const { data } = await axios.get(`/api/auth/profile/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
        setProfileDetails({ ...profileDetails, ...data })
      } catch (error) {
        console.log(error)
        console.log(error.response.data.detail)
        setError(true)
      }
      setLoading(false)
    }
    getProfileDetails()
  }, [])

  const handleChange = (e) => {
    setProfileDetails({ ...profileDetails, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(profileDetails)
    console.log(token)
    try {
      const { data } = await axios.put(`/api/auth/profile/${userId}`, profileDetails, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      setSubmitted(true)
    } catch (error) {
      console.log(error)
      console.log(error.response)
    }
  }

  return (
    <Box sx={{ display: 'flex', p: 10, bgcolor: 'background.default' }}>
      <Box id='profile-menu' sx={{ width: '25%' }}>
        <List sx={{ bgcolor: 'primary.main', color: 'white' }}>
          <ListItem>
            <ListItemText>My Profile</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>My Cards</ListItemText>
          </ListItem>
        </List>
      </Box>
      { loading ? <Loading /> : error ? <Error /> : 
        <Box id='profile-settings' component='form' onSubmit={handleSubmit}
          sx={{ width: '75%', display: 'flex', flexDirection: 'column', mx: { sm: 5, md: 10 }, bgcolor: 'background.paper', p: 5 }}>
          <Typography variant='h5' sx={{ color: 'primary.contrastText' }}>Edit Profile</Typography>
          <Typography variant='body1' sx={{ color: 'primary.contrastText', mb: 2 }}>Update your profile settings</Typography>
          <TextField className='username'
            name='username'
            value={profileDetails.username} label='Username'
            variant='standard'
            onChange={handleChange} />
          <TextField className='firstName'
            name='first_name'
            value={profileDetails.first_name} label='First Name'
            variant='standard'
            onChange={handleChange} />
          <TextField className='lastName'
            name='last_name'
            value={profileDetails.last_name} label='Last Name'
            variant='standard'
            onChange={handleChange} />
          <TextField className='email'
            type='email'
            name='email'
            value={profileDetails.email} label='Email'
            variant='standard'
            onChange={handleChange} />
          <TextField className='password'
            type='password'
            name='password'
            value={profileDetails.password} label='Password'
            variant='standard'
            onChange={handleChange} />
          <TextField className='passwordConfirmation'
            type='password'
            name='password_confirmation'
            value={profileDetails.password_confirmation}
            label='Password Confirmation'
            variant='standard'
            onChange={handleChange} />
          {/* Submit Button */}
          { !submitted ?
            <Button type='submit' color='primary' variant='outlined' sx={{ mt: 3 }}>Edit</Button> :
            <Button type='submit' color='success' variant='outlined' sx={{ mt: 3 }} disabled>Submitted!</Button>
          }
        </Box>
      }
    </Box>
  )
}

export default Profile