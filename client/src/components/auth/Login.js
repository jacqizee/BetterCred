import { useState } from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'

const Login = ({ loginOpen, setLoginOpen, joinOpen, setJoinOpen }) => {

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }

  // const [loginOpen, setLoginOpen] = useState(false)
  const handleOpen = () => setLoginOpen(true)
  const handleClose = () => setLoginOpen(false)

  return (
    <Box>
      <Button color='secondary' onClick={handleOpen} sx={{ textTransform: 'none' }}>login</Button>
      <Modal
        open={loginOpen}
        onClose={handleClose}
        aria-labelledby="login-modal"
        aria-describedby="modal with login form"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </Box>
    
  )
}

export default Login