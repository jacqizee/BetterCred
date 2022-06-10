import { useState } from 'react'

// MUI Components
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'

// Icons
import CloseIcon from '@mui/icons-material/Close'

// Styling
import { flexCentered } from '../styles/Styling'

const Login = () => {

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90vw', md: '65vw' },
    bgcolor: 'background.paper',
    borderRadius: 18,
    boxShadow: 2,
    py: 6,
    px: 4,
    ...flexCentered,
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('submitted')
  }

  return (
    <Box>
      <Button color='secondary' variant='outlined' onClick={handleOpen} sx={{ textTransform: 'none', mr: 1 }}>join</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="login-modal"
        aria-describedby="modal with login form"
      >
        <Box sx={style}>
          <IconButton onClick={handleClose} sx={{ position: 'fixed', right: '2.25rem', top: '1.25rem' }} >
            <CloseIcon />
          </IconButton>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ color: 'primary.contrastText' }}>
            Join BetterCred
          </Typography>
          <Grid container spacing={2} component='form' onSubmit={handleSubmit} sx={{ width: '85%', pt: 3, pb: 2 }}>
            <Grid item xs={12}>
              <TextField type='email' id='email' label='Email' variant='filled' fullWidth />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField id='first-name' name='first-name' label='First Name' variant='filled' fullWidth />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField id='last-name' name='last-name' label='Last Name' variant='filled' fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField id='username' label='Username' variant='filled' fullWidth />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField id='password' name='password' label='Password' variant='filled' fullWidth />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField id='password-confirm' name='password_confirm' label='Password Confirmation' variant='filled' fullWidth />
            </Grid>
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <Button type='submit'>Submit</Button>
            </Grid>
          </Grid>
          

        </Box>
      </Modal>
    </Box>
    
  )
}

export default Login