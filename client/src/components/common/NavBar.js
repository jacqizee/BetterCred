import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// React components
import Login from '../auth/Login'
import Join from '../auth/Join'
import { DarkModeSwitch } from '../styles/NavBar'

// Helper Functions
import { getPayload, handleLogOut } from '../helpers/auth'

// MUI Components
import { AppBar, Box, Toolbar, Typography, Button, Drawer,
  List, ListItem, ListItemButton, useScrollTrigger, Slide,
  ListItemText, Menu, MenuItem, Collapse } from '../styles/MaterialUI'

// Styling
import { flexRowCentered } from '../styles/styling'

// Icons
import MenuIcon from '@mui/icons-material/Menu'
import Logo from '../../assets/bettercred-logo.png'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'

const Navigation = ({ mode, setMode }) => {

  const nav = useNavigate()

  // Navbar Menu Items
  const mainMenu = ['cards', 'bonuses', 'learn']

  // Drawer State
  const [ drawerOpen, setDrawerOpen ] = useState(false)

  // Light/Dark Mode Switch State
  const [ switchStatus, setSwitchStatus ] = useState(false)

  // Login/Join Modal Buttons
  const [ loginOpen, setLoginOpen ] = useState(false)
  const [ joinOpen, setJoinOpen ] = useState(false)

  // Profile Menu
  const [ profileAnchorEl, setProfileAnchorEl] = useState(null)
  const openProfile = Boolean(profileAnchorEl)
  const handleProfileClick = (event) => {
    setProfileAnchorEl(event.currentTarget)
  }

  const handleProfileClose = () => {
    setProfileAnchorEl(null)
  }

  const handleProfileNav = (e) => {
    nav(`/profile/${getPayload().sub}/`, { state: { profileDest: e.target.innerText } })
  }

  const profileMenu = {
    'my profile': handleProfileNav,
    'my cards': handleProfileNav,
    'logout': handleLogOut,
  }

  // Profile Burger Menu
  const [ openBurgerProfile, setOpenBurgerProfile ] = useState(false)

  // Drawer
  const toggleDrawer = (open) => (e) => {
    if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
      return
    }
    setDrawerOpen(open)
  }

  // Light/Dark Mode on Local Storage
  useEffect(() => {
    if (window.localStorage.getItem('bettercred-mode')) {
      setMode(window.localStorage.getItem('bettercred-mode'))
    }
    const loadSwitch = () => {
      mode === 'light' ? setSwitchStatus(false) : setSwitchStatus(true)
    }
    loadSwitch()
  }, [mode, setMode])

  const handleModeChange = (e) => {
    let newMode
    e.target.value === 'light' ? newMode = 'dark' : newMode = 'light'

    setMode(newMode)
    window.localStorage.setItem('bettercred-mode', newMode)
  }

  const trigger = useScrollTrigger()

  return (
    <Box sx={{ maxHeight: '10vh' }}>
      <Slide appear={true} direction="down" in={!trigger}>
        <AppBar position='sticky' enableColorOnDark color='primary' sx={{ boxShadow: 0 }} >
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* Logo */}
            <Typography variant='h6' component={Link} to={'/'} sx={{ textDecoration: 'none', color: 'secondary.light', ...flexRowCentered }}>
              BetterCred <Box component='img' src={Logo} sx={{ ml: 1.5, height: '2rem' }}/>
            </Typography>

            {/* Row Menu on md or larger */}
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
                  <DarkModeSwitch mode={mode} switchStatus={switchStatus} handleModeChange={handleModeChange} />
                </Box>
              </Box>
            </Box>  

            {/* Drawer Menu on XS screens */}
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
                        mode={mode} switchStatus={switchStatus} handleModeChange={handleModeChange}
                        sx={{ ml: 2.5, mt: .85 }}
                      />
                    </ListItem>
                    
                  </List>
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </AppBar>
      </Slide>
    </Box>
  )
}

export default Navigation