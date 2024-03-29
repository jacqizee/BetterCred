import { useState } from 'react'
import axios from 'axios'

// Components
import { Box, Typography, Button, IconButton, Modal, TextField, Grid, Link } from '../styles/MaterialUI'
import CloseButton from '../buttons/CloseButton'

// Icons
import LockRoundedIcon from '@mui/icons-material/LockRounded'

// Helpers
import { handleFormChange } from '../helpers/forms'
import { handleSwap, handleOpen, handleClose, registerForm } from './util'

// Styling
import { loginModalStyle } from '../styles/styling'

const Join = ({ loginOpen, setLoginOpen, joinOpen, setJoinOpen }) => {

  // Error Handling
  const [ formErrors, setFormErrors ] = useState(false)

  // State of Modal Submit Button
  const [ registered, setRegistered ] = useState(false)

  const [ formData, setFormData ] = useState(registerForm)

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/auth/register/', formData)
      setRegistered(true)
      setFormData(registerForm)
      setFormErrors(false)
      handleSwap(joinOpen, setJoinOpen, loginOpen, setLoginOpen)
    } catch (error) {
      console.log(error.response.data.message)
      setFormErrors(error.response.data.message)
    }
  }

  return (
    <Box>
      {/* Join Button */}
      <Button color='secondary' variant='contained' onClick={() => handleOpen(setJoinOpen)} sx={{ textTransform: 'none', mr: 1 }}>join</Button>
      <Modal
        open={joinOpen}
        onClose={() => handleClose(setJoinOpen)}
        aria-labelledby="register-modal"
        aria-describedby="modal with register form"
      >
        <Box sx={loginModalStyle}>
          {/* Close Icon (X) */}
          <CloseButton setModalOpen={ setJoinOpen }/>

          {/* Lock Icon */}
          <LockRoundedIcon sx={{ color: 'primary.contrastText', bgcolor: 'background.default', p: 1, height: '2.5rem', width: '2.5rem', borderRadius: 10 }} />

          {/* Heading */}
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ color: 'primary.contrastText' }}>
            Join BetterCred
          </Typography>
          
          {/* Form */}
          <Grid container spacing={{ xs: 1, md: 2 }} component='form' onSubmit={handleSubmit} sx={{ width: '85%', pt: 3, pb: 2 }}>
            {/* Email */}
            <Grid item xs={12}>
              <TextField className='email'
                type='email'
                name='email'
                label='Email'
                variant='filled'
                value={formData.email}
                onChange={(e) => handleFormChange(e, setFormData, formData)}
                error={Boolean(formErrors.email)}
                helperText={formErrors.email}
                fullWidth />
            </Grid>

            {/* First Name */}
            <Grid item xs={6}>
              <TextField className='first-name'
                name='first_name'
                label='First Name'
                variant='filled'
                value={formData.first_name}
                onChange={(e) => handleFormChange(e, setFormData, formData)}
                error={Boolean(formErrors.first_name)}
                helperText={formErrors.first_name}
                fullWidth />
            </Grid>

            {/* Last Name */}
            <Grid item xs={6}>
              <TextField className='last-name'
                name='last_name'
                label='Last Name'
                variant='filled'
                value={formData.last_name}
                onChange={(e) => handleFormChange(e, setFormData, formData)}
                error={Boolean(formErrors.last_name)}
                helperText={formErrors.last_name}
                fullWidth />
            </Grid>

            {/* Username */}
            <Grid item xs={12}>
              <TextField className='username'
                name='username'
                label='Username'
                variant='filled'
                value={formData.username}
                onChange={(e) => handleFormChange(e, setFormData, formData)}
                error={Boolean(formErrors.username)}
                helperText={formErrors.username}
                fullWidth />
            </Grid>

            {/* Password */}
            <Grid item xs={12} md={6}>
              <TextField className='password'
                type='password'
                name='password'
                label='Password'
                variant='filled'
                value={formData.password}
                onChange={(e) => handleFormChange(e, setFormData, formData)}
                error={Boolean(formErrors.password)}
                helperText={formErrors.password}
                fullWidth />
            </Grid>

            {/* Password Confirmation */}
            <Grid item xs={12} md={6}>
              <TextField className='password-confirmation'
                type='password'
                name='password_confirmation'
                label='Password Confirmation'
                variant='filled'
                value={formData.password_confirmation}
                error={Boolean(formErrors.password_confirmation)}
                helperText={formErrors.password_confirmation}
                onChange={(e) => handleFormChange(e, setFormData, formData)}
                fullWidth />
            </Grid>

            {/* For Errors - if errors are returned */}
            { formErrors.error && 
              <Grid item xs={12} sx={{ textAlign: 'center' }}>
                { formErrors.error.map(err => <Typography variant='caption' key={err} sx={{ color: 'red', display: 'block' }}>{err}</Typography>)}
              </Grid>
            }

            {/* Submit Button */}
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              { !registered ?
                <Button type='submit' variant='contained' sx={{ mt: 2 }}>Submit</Button> : 
                <Button type='submit' variant='contained' sx={{ mt: 2 }} disabled>Registered!</Button>
              }
            </Grid>
          </Grid>

          {/* Modal Swap */}
          <Typography>Already a Member? <Link onClick={() => handleSwap(joinOpen, setJoinOpen, loginOpen, setLoginOpen, setFormErrors)} underline='hover' sx={{ '&:hover': { cursor: 'pointer' } }}>Login</Link></Typography>
        </Box>
      </Modal>
    </Box>
    
  )
}

export default Join