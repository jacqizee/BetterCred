import { useState } from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'

const Login = () => {

  const flexCentered = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90vw', md: '65vw' },
    bgcolor: 'background.paper',
    borderRadius: 18,
    boxShadow: 2,
    py: 5,
    px: 8,
    ...flexCentered,
  }



  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

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
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ color: 'primary.contrastText', pb: 1 }}>
            Join BetterCred
          </Typography>
          <Grid container spacing={2} sx={{ width: '85%' }}>
            <Grid item xs={12} md={6}>
              <TextField id='first-name' label='First Name' variant='filled' fullWidth />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField id='last-name' label='Last Name' variant='filled' fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField id='email' label='Email' variant='filled' fullWidth />
            </Grid>
          </Grid>

        </Box>
      </Modal>
    </Box>
    
  )
}

export default Login