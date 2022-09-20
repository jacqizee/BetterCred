import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// React components
import NavBarWide from './NavBarWide'
import NavBarDrawer from './NavBarDrawer'

import { getPayload, handleLogOut } from '../helpers/auth'

// MUI Components
import { AppBar, Box, Toolbar, Typography, useScrollTrigger, Slide } from '../styles/MaterialUI'

// Styling
import { flexRowCentered } from '../styles/styling'

// Icons
import Logo from '../../assets/bettercred-logo.png'

const NavBar = ({ mode, setMode }) => {
  const nav = useNavigate()

  // Light/Dark Mode Switch State
  const [ switchStatus, setSwitchStatus ] = useState(false)

  // Login/Join Modal Buttons
  const [ loginOpen, setLoginOpen ] = useState(false)
  const [ joinOpen, setJoinOpen ] = useState(false)

  const handleProfileNav = (e) => {
    nav(`/profile/${getPayload().sub}/`, { state: { profileDest: e.target.innerText } })
  }

  const profileMenu = {
    'my profile': handleProfileNav,
    'my cards': handleProfileNav,
    'logout': handleLogOut,
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
            <NavBarWide loginOpen={loginOpen} setLoginOpen={setLoginOpen} joinOpen={joinOpen} setJoinOpen={setJoinOpen} mode={mode} setMode={setMode} switchStatus={switchStatus} profileMenu={profileMenu} />

            {/* Drawer Menu on XS screens */}
            <NavBarDrawer loginOpen={loginOpen} setLoginOpen={setLoginOpen} joinOpen={joinOpen} setJoinOpen={setJoinOpen} mode={mode} setMode={setMode} switchStatus={switchStatus} profileMenu={profileMenu} />

          </Toolbar>
        </AppBar>
      </Slide>
    </Box>
  )
}

export default NavBar