import { useState, useEffect } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import axios from 'axios'

// Components
import EditProfile from './EditProfile'
import MyCards from './MyCards'
import Loading from '../utilities/Loading'
import Error from '../utilities/Error'

// Helper Functions
import { getLocalToken, confirmUser } from '../helpers/auth.js'

// MUI Components
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Slide from '@mui/material/Slide'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'

const Profile = () => {

  // Navigate
  const nav = useNavigate()
  const location = useLocation()

  // Params
  const { userId } = useParams()

  // Token
  const token = getLocalToken()

  // Error Handling
  const [ loading, setLoading ] = useState(true)
  const [ error, setError ] = useState(false)

  // Menu States
  const [ currentPage, setCurrentPage ] = useState('')
  const [ editProfileDeco, setEditProfileDeco ] = useState('none')
  const [ myCardsDeco, setMyCardsDeco ] = useState('none')

  // Edit Form Details
  const [ profileDetails, setProfileDetails ] = useState({
    password: '',
    password_confirmation: '',
  })

  useEffect(() => {
    // Confirm User is Logged In + Owner
    if (!token || !confirmUser(userId)) {
      nav('/')
    }

    if (location.state) {
      setCurrentPage(location.state.profileDest)
      location.state.profileDest === 'my profile' ? setEditProfileDeco('underline') : setMyCardsDeco('underline')
    } else {
      setCurrentPage('my profile')
    }

    // Get Profile Details
    const getProfileDetails = async () => {
      try {
        const { data } = await axios.get(`/api/auth/profile/${userId}/`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
        setProfileDetails({ ...profileDetails, ...data })
      } catch (error) {
        console.log(error)
        setError(true)
      }
      setLoading(false)
    }
    getProfileDetails()
  }, [])

  const handleMenu = (e) => {
    if (e.target.innerHTML === 'my profile') {
      setCurrentPage('my profile')
      setEditProfileDeco('underline')
      setMyCardsDeco('none')
    }

    if (e.target.innerHTML === 'my cards') {
      setCurrentPage('my cards')
      setMyCardsDeco('underline')
      setEditProfileDeco('none')
    }
  }

  return (
    <>
      { loading ? <Loading /> : error ? <Error /> :
        <Box sx={{ display: 'flex', p: { xs: 3, md: 5 }, bgcolor: 'background.default', justifyContent: 'center', height: 'fit-content', minHeight: '100vh' }}>
          {/* Side Profile Menu - small screens or larger */}
          <Slide direction='right' in={true} timeout={{ enter: 1000 }}>
            <Box id='profile-menu'
              sx={{ width: '25%', maxWidth: '350px', display: { xs: 'none', sm: 'inline' } }}>
              <List sx={{ bgcolor: 'primary.main', color: 'white' }}>

                {/* My Profile */}
                <ListItem>
                  <ListItemText onClick={handleMenu} sx={{ textDecoration: editProfileDeco, '&:hover': { cursor: 'pointer' } }}>my profile</ListItemText>
                </ListItem>

                {/* My Cards */}
                <ListItem>
                  <ListItemText onClick={handleMenu} sx={{ textDecoration: myCardsDeco, '&:hover': { cursor: 'pointer' } }}>my cards</ListItemText>
                </ListItem>
                
              </List>
            </Box>
          </Slide>

          {/* Bottom Navigation - xs screens only */}
          <BottomNavigation showLabels sx={{ display: { xs: 'inline-flex', sm: 'none' }, position: 'fixed', width: '100%', bottom: 0 }}>
            <BottomNavigationAction label='my profile' onClick={handleMenu}/>
            <BottomNavigationAction label='my cards' onClick={handleMenu}/>
          </BottomNavigation>

          {currentPage === 'my profile' ? 
            <EditProfile profileDetails={profileDetails} setProfileDetails={setProfileDetails} userId={userId} token={token} />
            : currentPage === 'my cards' ?
              <MyCards profileDetails={profileDetails} setProfileDetails={setProfileDetails} userId={userId} token={token} /> : ''
          }
        </Box>
      }
    </>
  )
}

export default Profile