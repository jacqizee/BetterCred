import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// React components
import Login from '../auth/Login'
import Join from '../auth/Join'

// MUI Components
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import Slide from '@mui/material/Slide'
import ListItemText from '@mui/material/ListItemText'
import Switch from '@mui/material/Switch'

// Styling
import { flexRowCentered } from '../styles/Styling'

// Icons
import MenuIcon from '@mui/icons-material/Menu'
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded'
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded'
import Logo from '../../assets/bettercred-logo.png'

const Navigation = ({ mode, setMode }) => {

  const menu = ['cards', 'profile']
  const [ drawerOpen, setDrawerOpen ] = useState(false)
  const [ switchStatus, setSwitchStatus ] = useState(false)

  const [ loginOpen, setLoginOpen ] = useState(false)
  const [ joinOpen, setJoinOpen ] = useState(false)

  const toggleDrawer = (open) => (e) => {
    if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
      return
    }
    setDrawerOpen(open)
  }

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

  const handleLogOut = () => {
    window.localStorage.removeItem('bettercred')
    window.location.reload(false)
  }

  const trigger = useScrollTrigger()

  return (
    <Box sx={{ maxHeight: '10vh' }}>
      <Slide appear={false} direction="down" in={!trigger}>
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
                {menu.map(item => <Typography component={Link} to={`/${item}`} key={item} sx={{ textDecoration: 'none' }}><Button sx={{ color: 'secondary.light', textTransform: 'none' }}>{item}</Button></Typography>)}
              </Box>
              
              <Box sx={ flexRowCentered }>
                {/* Login/Join Buttons */}
                { !window.localStorage.getItem('bettercred') && <Box sx={ flexRowCentered }>
                  <Login loginOpen={loginOpen} setLoginOpen={setLoginOpen} joinOpen={joinOpen} setJoinOpen={setJoinOpen} />
                  <Join loginOpen={loginOpen} setLoginOpen={setLoginOpen} joinOpen={joinOpen} setJoinOpen={setJoinOpen} />
                </Box>}

                {/* Logout Button */}
                { window.localStorage.getItem('bettercred') ? <Button onClick={handleLogOut} color='secondary' variant='outlined' sx={{ textTransform: 'none' }} >Log Out</Button> : ''}
              
                {/* Light/Dark Mode */}
                <Box color='primary'>
                  <Switch 
                    color='secondary'
                    checked={switchStatus}
                    onChange={handleModeChange}
                    value={mode}
                    icon={<LightModeRoundedIcon sx={{ bgcolor: '#000', borderRadius: 5, p: .5 }} />}
                    checkedIcon={<DarkModeRoundedIcon sx={{ bgcolor: '#fff', borderRadius: 5, p: .5 }} />}
                  />
                </Box>
              </Box>
            </Box>  

            {/* Drawer Menu on XS screens */}
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>

              {/* Login/Join Buttons */}
              { !window.localStorage.getItem('bettercred') && <>
                <Login loginOpen={loginOpen} setLoginOpen={setLoginOpen} joinOpen={joinOpen} setJoinOpen={setJoinOpen} />
                <Join loginOpen={loginOpen} setLoginOpen={setLoginOpen} joinOpen={joinOpen} setJoinOpen={setJoinOpen} />
              </> }

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
                    {menu.map(item => {
                      return (
                        <ListItem key={item}>
                          <Typography component={Link} to={`#${item}`} color='primary' sx={{ textDecoration: 'none' }}>
                            <ListItemButton onClick={toggleDrawer(false)}>
                              <ListItemText primary={item} />
                            </ListItemButton>
                          </Typography>
                        </ListItem>
                      )
                    })}
                    <Switch 
                      checked={switchStatus}
                      onChange={handleModeChange}
                      value={mode}
                      color='secondary'
                      icon={<LightModeRoundedIcon sx={{ bgcolor: '#000', borderRadius: 5, p: .5 }} />}
                      checkedIcon={<DarkModeRoundedIcon sx={{ bgcolor: '#fff', borderRadius: 5, p: .5 }} />}
                      sx={{ ml: 2.5, mt: .85 }}
                    />
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
