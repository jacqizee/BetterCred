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

const Join = ({ loginOpen, setLoginOpen, joinOpen, setJoinOpen }) => {

  // Handle Modal Open and Close
  const handleOpen = () => setJoinOpen(true)
  const handleClose = () => setJoinOpen(false)

  // State of Modal Submit Button
  const [ registered, setRegistered ] = useState(false)

  const [ formData, setFormData ] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    password_confirmation: '',
    profile_picture: '',
  })

  const handleSwap = (e) => {
    setJoinOpen(false)
    setLoginOpen(true)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/auth/register/', formData)
      setRegistered(true)
      setFormData({
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        password_confirmation: '',
        profile_picture: '',
      })
    } catch (error) {
      console.log(error.response.data.message.error)
    }
  }

  return (
    <Box>
      <Button color='secondary' variant='contained' onClick={handleOpen} sx={{ textTransform: 'none', mr: 1 }}>join</Button>
      <Modal
        open={joinOpen}
        onClose={handleClose}
        aria-labelledby="register-modal"
        aria-describedby="modal with register form"
      >
        <Box sx={loginModalStyle}>
          <IconButton onClick={handleClose} sx={{ position: 'fixed', right: '2.25rem', top: '1.25rem' }} >
            <CloseIcon />
          </IconButton>
          <LockRoundedIcon sx={{ boxShadow: 1, p: 1, borderRadius: 10, height: '2rem', width: '2rem', mb: 2 }} />
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ color: 'primary.contrastText' }}>
            Join BetterCred
          </Typography>
          <Grid container spacing={{ xs: 1, md: 2 }} component='form' onSubmit={handleSubmit} sx={{ width: '85%', pt: 3, pb: 2 }}>
            <Grid item xs={12}>
              <TextField type='email' className='email' name='email' label='Email' variant='filled' value={formData.email} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={6}>
              <TextField className='first-name' name='first_name' label='First Name' variant='filled' value={formData.first_name} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={6}>
              <TextField className='last-name' name='last_name' label='Last Name' variant='filled' value={formData.last_name} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField className='username' name='username' label='Username' variant='filled' value={formData.username} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField type='password' className='password' name='password' label='Password' variant='filled' value={formData.password} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField type='password' className='password-confirmation' name='password_confirmation' label='Password Confirmation' variant='filled' value={formData.password_confirmation} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              { !registered ?
                <Button type='submit' variant='contained' sx={{ mt: 2 }}>Submit</Button> : 
                <Button type='submit' variant='contained' sx={{ mt: 2 }} disabled>Registered!</Button>
              }
            </Grid>
          </Grid>
          <Typography>Already a Member? <Link onClick={handleSwap} underline='hover' sx={{ '&:hover': { cursor: 'pointer' } }}>Login</Link></Typography>
        </Box>
      </Modal>
    </Box>
    
  )
}

export default Join