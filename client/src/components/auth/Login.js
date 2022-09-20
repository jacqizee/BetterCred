import { useState } from 'react'
import axios from 'axios'

// Components
import { Box, Typography, Button, Modal, TextField, Grid, Link } from '../styles/MaterialUI'
import CloseButton from '../buttons/CloseButton'

// Icons
import LockRoundedIcon from '@mui/icons-material/LockRounded'

// Helpers
import { handleFormChange } from '../helpers/forms'
import { handleSwap, handleOpen, handleClose, loginForm } from './util'

// Styling
import { loginModalStyle } from '../styles/styling'

const Login = ({ loginOpen, setLoginOpen, joinOpen, setJoinOpen }) => {

  // Error Handling
  const [ formErrors, setFormErrors ] = useState(false)

  // State of Modal Submit Button
  const [ loggedIn, setLoggedIn ] = useState(false)

  // Form Data State
  const [ formData, setFormData ] = useState(loginForm)

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/auth/login/', formData)
      window.localStorage.setItem('bettercred', data.token)
      setLoggedIn(true)
      setLoginOpen(false)
      window.location.reload()
    } catch (error) {
      setFormErrors(error.response.data.detail)
    }
    setFormData(loginForm)
  }

  return (
    <Box>
      {/* Login Button */}
      <Button color='secondary' variant='outlined' onClick={() => handleOpen(setLoginOpen)} sx={{ textTransform: 'none', mr: 1 }}>login</Button>
      <Modal
        open={loginOpen}
        onClose={() => handleClose(setLoginOpen)}
        aria-labelledby="login-modal"
        aria-describedby="modal with login form"
      >
        <Box sx={loginModalStyle}>
          {/* Close Icon */}
          <CloseButton setModalOpen={ setLoginOpen }/>

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
          <Typography>Need an account? <Link onClick={() => handleSwap(joinOpen, setJoinOpen, loginOpen, setLoginOpen, setFormErrors)} underline='hover' sx={{ '&:hover': { cursor: 'pointer' } }}>Join</Link></Typography>
        </Box>
      </Modal>
    </Box>
    
  )
}

export default Login