import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// React components
import Login from '../auth/Login'
import Join from '../auth/Join'
import { DarkModeSwitch } from '../styles/DarkMode'

import { mainMenu } from './util'

import { Box, Typography, Button, Drawer, Menu, MenuItem } from '../styles/MaterialUI'

// Styling
import { flexRowCentered } from '../styles/styling'

const NavBarWide = ({ loginOpen, setLoginOpen, joinOpen, setJoinOpen, mode, setMode, switchStatus, profileMenu }) => {
  const nav = useNavigate()

  const [ profileAnchorEl, setProfileAnchorEl ] = useState(null)

  const openProfile = Boolean(profileAnchorEl)

  const handleProfileClick = (event) => {
    setProfileAnchorEl(event.currentTarget)
  }

  const handleProfileClose = () => {
    setProfileAnchorEl(null)
  }

  return (
    <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'space-between', width: '100%' }}>

      {/* Menu Items */}
      <Box sx={{ ml: 2 }}>
        {mainMenu.map(item => <Typography component={Link} to={`/${item}`} key={item} sx={{ textDecoration: 'none' }}><Button sx={{ color: 'secondary.light', textTransform: 'none' }}>{item}</Button></Typography>)}
      </Box>
      
      <Box sx={ flexRowCentered }>
        {/* Login/Join Buttons */}
        { !window.localStorage.getItem('bettercred') && <Box sx={ flexRowCentered }>
          <Login loginOpen={loginOpen} setLoginOpen={setLoginOpen} joinOpen={joinOpen} setJoinOpen={setJoinOpen} />
          <Join loginOpen={loginOpen} setLoginOpen={setLoginOpen} joinOpen={joinOpen} setJoinOpen={setJoinOpen} />
        </Box>}

        {/* Profile Button */}
        { window.localStorage.getItem('bettercred') &&
          <>
            <Button color='secondary' onClick={handleProfileClick} sx={{ textTransform: 'none' }}>profile</Button>
            <Menu anchorEl={profileAnchorEl} open={openProfile} onClose={handleProfileClose}>
              {Object.keys(profileMenu).map((value, index) => <MenuItem key={index} onClick={profileMenu[value]}>{value}</MenuItem>)}
            </Menu>
          </>
        }
      
        {/* Light/Dark Mode */}
        <Box color='primary'>
          <DarkModeSwitch mode={mode} setMode={setMode} switchStatus={switchStatus} />
        </Box>
      </Box>
    </Box>  
  )
}

export default NavBarWide