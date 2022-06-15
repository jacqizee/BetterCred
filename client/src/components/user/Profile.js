import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

// Components
import EditProfile from './EditProfile'
import MyCards from './MyCards'
import Loading from '../utilities/Loading'
import Error from '../utilities/Error'

// Helper Functions
import { getPayload, getLocalToken, confirmUser, handleLogOut } from '../helpers/auth.js'

// MUI Components
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'

const Profile = () => {

  // Navigate
  const nav = useNavigate()

  // Params
  const { userId } = useParams()

  // Token
  const token = getLocalToken()

  // Error Handling
  const [ loading, setLoading ] = useState(true)
  const [ error, setError ] = useState(false)

  // Menu States
  const [ currentPage, setCurrentPage ] = useState('My Profile')

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
    if (e.target.innerHTML === 'My Profile') {
      setCurrentPage('My Profile')
    }

    if (e.target.innerHTML === 'My Cards') {
      setCurrentPage('My Cards')
    }
  }

  return (
    <>
      { loading ? <Loading /> : error ? <Error /> :
        <Box sx={{ display: 'flex', p: { xs: 3, md: 5 }, bgcolor: 'background.default', justifyContent: 'center', height: '100vh' }}>
          {/* Profile Menu */}
          <Box id='profile-menu'
            sx={{ width: '25%', maxWidth: '350px' }}>
            <List sx={{ bgcolor: 'primary.main', color: 'white' }}>
              <ListItem>
                <ListItemText onClick={handleMenu}>My Profile</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText onClick={handleMenu}>My Cards</ListItemText>
              </ListItem>
            </List>
          </Box>
          { currentPage === 'My Profile' ? 
            <EditProfile profileDetails={profileDetails} setProfileDetails={setProfileDetails} userId={userId} token={token} /> :
            <MyCards />
          }
        </Box>
      }
    </>
  )
}

export default Profile