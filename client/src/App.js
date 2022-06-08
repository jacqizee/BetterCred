import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import NavBar from './components/common/NavBar'
import CreditCards from './components/CreditCards'
import Profile from './components/Profile'

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/credit' element={<CreditCards />} />
        <Route path='/profile/:userid' element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
