import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

// Helpers
import { getPayload, getLocalToken, confirmUser, handleLogOut } from '../helpers/auth.js'

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

const EditProfile = ({ profileDetails, setProfileDetails, userId, token }) => {

  // Error Handling
  const [ formErrors, setFormErrors ] = useState(false)

  // Form Submit State
  const [ submitted, setSubmitted ] = useState(false)

  // Handle Form Change
  const handleChange = (e) => {
    setProfileDetails({ ...profileDetails, [e.target.name]: e.target.value })
  }

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.put(`/api/auth/profile/${userId}/`, profileDetails, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      setFormErrors(false)
      setSubmitted(true)
    } catch (error) {
      console.log(error.response.data)
      setFormErrors(error.response.data)
    }
  }

  const [ deleteText, setDeleteText ] = useState('Delete Account') 
  const confirmDelete = () => {

    // Handle Delete Function
    const handleDelete = async () => {
      try {
        await axios.delete(`/api/auth/profile/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
        handleLogOut()
      } catch (error) {
        console.log(error)
      }
    }
  
    // If user confirms, execute delete function
    deleteText === 'Delete Account' ? setDeleteText('Are you sure you want to delete?') : handleDelete()
  }

  return (
    <Box id='profile-settings'
      component='form'
      onSubmit={handleSubmit}
      sx={{ width: '75%', maxWidth: '850px', display: 'flex', flexDirection: 'column', ml: { xs: 3, md: 3.5 }, bgcolor: 'background.paper', p: 5, height: 'fit-content' }}>
      
      {/* Heading and Subheading */}
      <Typography variant='h5' sx={{ color: 'primary.contrastText' }}>Edit Profile</Typography>
      <Typography variant='body1' sx={{ color: 'primary.contrastText', mb: 1 }}>Update your profile settings</Typography>
      <Divider sx={{ my: 1 }} />
      {/* Username */}
      <TextField className='username'
        name='username'
        value={profileDetails.username} label='Username'
        variant='standard'
        onChange={handleChange}
        error={Boolean(formErrors.username)}
        helperText={formErrors.username}
        sx={{ mt: 1 }} />

      {/* First Name */}
      <TextField className='firstName'
        name='first_name'
        value={profileDetails.first_name} label='First Name'
        variant='standard'
        onChange={handleChange}
        error={Boolean(formErrors.first_name)}
        helperText={formErrors.first_name}
        sx={{ mt: 1 }} />

      {/* Last Name */}
      <TextField className='lastName'
        name='last_name'
        value={profileDetails.last_name} label='Last Name'
        variant='standard'
        onChange={handleChange}
        error={Boolean(formErrors.last_name)}
        helperText={formErrors.last_name}
        sx={{ mt: 1 }} />

      {/* Email */}
      <TextField className='email'
        type='email'
        name='email'
        value={profileDetails.email} label='Email'
        variant='standard'
        onChange={handleChange}
        error={Boolean(formErrors.email)}
        helperText={formErrors.email}
        sx={{ mt: 1 }} />

      {/* Password */}
      <TextField className='password'
        type='password'
        name='password'
        value={profileDetails.password} label='Password'
        variant='standard'
        onChange={handleChange}
        error={Boolean(formErrors.password)}
        helperText={formErrors.password}
        required
        sx={{ mt: 1 }} />

      {/* Password Confirmation */}
      <TextField className='passwordConfirmation'
        type='password'
        name='password_confirmation'
        value={profileDetails.password_confirmation}
        label='Password Confirmation'
        variant='standard'
        onChange={handleChange}
        error={Boolean(formErrors.password_confirmation)}
        helperText={formErrors.password_confirmation}
        required
        sx={{ mt: 1 }} />

      {/* Error Field - if error is returned */}
      { formErrors.error && 
        formErrors.error.map(err => <Typography variant='caption' key={err} sx={{ display: 'block', color: 'red' }}>{err}</Typography>)
      }

      {/* Submit Button */}
      { !submitted ?
        <Button type='submit' color='secondary' variant='contained' sx={{ mt: 3 }}>Edit</Button> :
        <Button type='submit' color='success' variant='outlined' sx={{ mt: 3 }} disabled>Edited!</Button>
      }

      {/* Delete Account Option */}
      <Box sx={{ width: '100%', textAlign: 'center', mt: .75 }}>
        <Typography variant='caption' onClick={confirmDelete} sx={{ color: 'crimson', '&:hover': { textDecoration: 'underline', cursor: 'pointer' } }}>{deleteText}</Typography>
      </Box>
    </Box>
  )
}

export default EditProfile