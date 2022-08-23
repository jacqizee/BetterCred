import { useState } from 'react'
import axios from 'axios'

// MUI Components
import { Box, Typography, Button, IconButton, Modal, TextField, Grid, Link } from '../styles/MaterialUI'

// Icons
import LockRoundedIcon from '@mui/icons-material/LockRounded'
import CloseIcon from '@mui/icons-material/Close'

// Helpers
import { loginForm, handleFormChange } from '../helpers/forms'

// Styling
import { loginModalStyle } from '../styles/Styling'

const Login = ({ loginOpen, setLoginOpen, joinOpen, setJoinOpen }) => {

  // Error Handling
  const [ formErrors, setFormErrors ] = useState(false)

  // Handle Modal Open and Close
  const handleOpen = () => setLoginOpen(true)
  const handleClose = () => setLoginOpen(false)

  // State of Modal Submit Button
  const [ loggedIn, setLoggedIn ] = useState(false)

  // Form Data State

  const [ formData, setFormData ] = useState(loginForm)

  // Swap from Login Modal to Join Modal
  const handleSwap = (e) => {
    setLoginOpen(false)
    setJoinOpen(true)
  }

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/auth/login/', formData)
      window.localStorage.setItem('bettercred', data.token)
      setLoggedIn(true)
      setFormData(loginForm)
      setLoginOpen(false)
      window.location.reload()
    } catch (error) {
      setFormErrors(error.response.data.detail)
      setFormData(loginForm)
    }
  }

  return (
    <Box>
      {/* Login Button */}
      <Button color='secondary' variant='outlined' onClick={handleOpen} sx={{ textTransform: 'none', mr: 1 }}>login</Button>
      <Modal
        open={loginOpen}
        onClose={handleClose}
        aria-labelledby="login-modal"
        aria-describedby="modal with login form"
      >
        <Box sx={loginModalStyle}>
          {/* Close Icon */}
          <IconButton onClick={handleClose} sx={{ position: 'fixed', right: '2.25rem', top: '1.25rem' }} >
            <CloseIcon />
          </IconButton>

          {/* Lock Icon */}
          <LockRoundedIcon sx={{ color: 'primary.contrastText', bgcolor: 'background.default', p: 1, height: '2.5rem', width: '2.5rem', borderRadius: 10 }} />

          {/* Heading */}
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ color: 'primary.contrastText' }}>
            Login to BetterCred
          </Typography>

          {/* Login Form */}
          <Grid container spacing={2} component='form' onSubmit={handleSubmit} sx={{ width: '85%', pt: 3, pb: 2 }}>
            {/* Username */}
            <Grid item xs={12}>
              <TextField className='username'
                name='username'
                label='Username'
                variant='filled'
                error={formErrors}
                value={formData.username}
                onChange={(e) => handleFormChange(e, setFormData, formData)}
                fullWidth />
            </Grid>

            {/* Password */}
            <Grid item xs={12}>
              <TextField className='password'
                type='password'
                name='password'
                label='Password'
                variant='filled'
                error={formErrors}
                value={formData.password}
                onChange={(e) => handleFormChange(e, setFormData, formData)}
                fullWidth />
            </Grid>

            {/* Form Errors - if errors are returned */}
            { formErrors && 
              <Grid item xs={12} sx={{ textAlign: 'center' }}>
                <Typography variant='body2' sx={{ color: 'red' }}>The username or password you entered is incorrect.</Typography>
              </Grid>
            }

            {/* Submit Buttons */}
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              { !loggedIn ?
                <Button type='submit' variant='contained' sx={{ mt: 2 }}>Submit</Button> : 
                <Button type='submit' variant='contained' sx={{ mt: 2 }} disabled>Success!</Button>
              }
            </Grid>
          </Grid>

          {/* Modal Swap */}
          <Typography>Need an account? <Link onClick={handleSwap} underline='hover' sx={{ '&:hover': { cursor: 'pointer' } }}>Join</Link></Typography>
        </Box>
      </Modal>
    </Box>
    
  )
}

export default Login