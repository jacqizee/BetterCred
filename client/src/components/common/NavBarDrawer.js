import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// React components
import Login from '../auth/Login'
import Join from '../auth/Join'
import { DarkModeSwitch } from '../styles/DarkMode'

import { mainMenu } from './util'

import { Box, Button, Drawer, List, ListItem, ListItemButton, ListItemText, Collapse } from '../styles/MaterialUI'

// Icons
import MenuIcon from '@mui/icons-material/Menu'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'

const NavBarDrawer = ({ loginOpen, setLoginOpen, joinOpen, setJoinOpen, mode, setMode, switchStatus, profileMenu }) => {

  // Profile Burger Menu
  const [ openBurgerProfile, setOpenBurgerProfile ] = useState(false)

  // Drawer State
  const [ drawerOpen, setDrawerOpen ] = useState(false)

  // Drawer
  const toggleDrawer = (open) => (e) => {
    if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
      return
    }
    setDrawerOpen(open)
  }

  
  return (
    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>

      {/* Hamburger Icon */}
      <Button onClick={toggleDrawer(true)}>
        <MenuIcon color='secondary' />
      </Button>
      
      {/* Drawer */}
      <Drawer
        anchor='right'
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        <Box sx={{ width: 350 }}>
          <List color='primary' sx={{ textDecoration: 'none' }}>

            {/* Menu Items */}
            {mainMenu.map(item => {
              return (
                <ListItem key={item}>
                  <ListItemButton component={Link} to={`/${item}`}  sx={{ textDecoration: 'none' }} onClick={toggleDrawer(false)}>
                    <ListItemText primary={item} />
                  </ListItemButton>
                </ListItem>
              )
            })}

            {/* Profile Menu */}
            { window.localStorage.getItem('bettercred') &&
              <>
                <ListItem sx={{ pb: 0 }}>
                  <ListItemButton onClick={() => setOpenBurgerProfile(!openBurgerProfile)}>
                    <ListItemText primary='profile' />
                    { openBurgerProfile ? <ExpandLess /> : <ExpandMore /> }
                  </ListItemButton>
                </ListItem>
                <Collapse in={openBurgerProfile} timeout='auto' unmountOnExit>
                  <List component='div' disablePadding>
                    {Object.keys(profileMenu).map((value, index) => (
                      <ListItem key={index} sx={{ py: 0 }} >
                        <ListItemButton onClick={profileMenu[value]} sx={{ pl: 4 }}>
                          <ListItemText primary={value} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </>
            }
            
            {/* Login/Join Buttons */}
            { !window.localStorage.getItem('bettercred') &&
              <ListItem sx={{ display: 'flex', justifyContent: 'center' }} fullWidth>
                <Login loginOpen={loginOpen} setLoginOpen={setLoginOpen} joinOpen={joinOpen} setJoinOpen={setJoinOpen} />
                <Join loginOpen={loginOpen} setLoginOpen={setLoginOpen} joinOpen={joinOpen} setJoinOpen={setJoinOpen} />
              </ListItem>
            }

            {/* Light/Dark Mode Switch */}
            <ListItem>
              <DarkModeSwitch 
                mode={mode} setMode={setMode} switchStatus={switchStatus}
                sx={{ ml: 2.5, mt: .85 }}
              />
            </ListItem>
            
          </List>
        </Box>
      </Drawer>
    </Box>
  )
}

export default NavBarDrawer