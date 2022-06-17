import { useState } from 'react'
import axios from 'axios'

// Helpers
import { handleLogOut } from '../helpers/auth.js'

// MUI Components
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Divider from '@mui/material/Divider'
import Alert from '@mui/material/Alert'
import Slide from '@mui/material/Slide'

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
    const updateDetails = { ...profileDetails }
    delete updateDetails.wallet
    try {
      await axios.put(`/api/auth/profile/${userId}/`, updateDetails, {
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

  // Delete Account
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
    <Slide direction='up' in={true}>
      <Box id='profile-settings'
        component='form'
        onSubmit={handleSubmit}
        sx={{ 
          width: { xs: '100%', sm: '75%' },
          maxWidth: '850px',
          display: 'flex',
          flexDirection: 'column',
          ml: { xs: 0, sm: 3.5 },
          bgcolor: 'background.paper',
          py: 5,
          px: { xs: 2.5, sm: 5 },
          height: 'fit-content' }}>
        
        {/* Heading and Subheading */}
        <Typography variant='h5' sx={{ color: 'primary.contrastText' }}>Edit Profile</Typography>
        <Typography variant='body1' sx={{ color: 'primary.contrastText', mb: 1 }}>Update your profile settings</Typography>
        
        <Divider sx={{ my: 1 }} />
        
        {/* Edit Success */}
        { submitted && <Alert onClose={() => setSubmitted(false)}>Edit successful!</Alert>}

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
        <Button type='submit' color='secondary' variant='contained' sx={{ mt: 3 }}>Edit</Button>

        {/* Delete Account Option */}
        <Box sx={{ width: '100%', textAlign: 'center', mt: .75 }}>
          <Typography variant='caption' onClick={confirmDelete} sx={{ color: 'crimson', '&:hover': { textDecoration: 'underline', cursor: 'pointer' } }}>{deleteText}</Typography>
        </Box>
      </Box>
    </Slide>
  )
}

export default EditProfile