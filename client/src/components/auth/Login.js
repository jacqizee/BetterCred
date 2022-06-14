import { useState } from 'react'
import axios from 'axios'

// MUI Components
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'

// Icons
import LockRoundedIcon from '@mui/icons-material/LockRounded'
import CloseIcon from '@mui/icons-material/Close'

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
  const clearedForm = {
    username: '',
    password: '',
  }
  const [ formData, setFormData ] = useState(clearedForm)

  // Swap from Login Modal to Join Modal
  const handleSwap = (e) => {
    setLoginOpen(false)
    setJoinOpen(true)
  }

  // Handle Form Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/auth/login/', formData)
      window.localStorage.setItem('bettercred', data.token)
      setLoggedIn(true)
      setFormData(clearedForm)
      setLoginOpen(false)
    } catch (error) {
      console.log(error.response)
      setFormErrors(error.response.data.detail)
      setFormData(clearedForm)
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
          <IconButton><LockRoundedIcon /></IconButton>

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
                onChange={handleChange}
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
                onChange={handleChange}
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