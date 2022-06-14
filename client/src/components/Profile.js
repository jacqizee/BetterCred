import { useState } from 'react'

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
import Grid from '@mui/material/Grid'

const Profile = () => {
  return (
    <Box sx={{ display: 'flex', p: 10, bgcolor: 'background.default' }}>
      <Box id='profile-menu' sx={{ width: '25%' }}>
        <List sx={{ bgcolor: 'primary.main', color: 'white' }}>
          <ListItem>
            <ListItemText>My Profile</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>My Cards</ListItemText>
          </ListItem>
        </List>
      </Box>
      <Box id='profile-settings' sx={{ width: '75%', display: 'flex', flexDirection: 'column', mx: { sm: 5, md: 10 } }}>
        <Typography variant='h5' sx={{ color: 'primary.contrastText' }}>Edit Profile</Typography>
        <Typography variant='body1' sx={{ color: 'primary.contrastText' }}>Update your profile settings</Typography>
        <TextField className="firstName" name='first_name' label="First Name" variant="standard" />
        <TextField className="lastName" name='last_name' label="Last Name" variant="standard" />
        <TextField className="email" name='email' label="Email" variant="standard" />
        <TextField className="password" name='password' label="Password" variant="standard" />
        <TextField className="passwordConfirmation" name='password_confirmation' label="Password Confirmation" variant="standard" />
      </Box>
    </Box>
  )
}

export default Profile