import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import NavBar from './components/common/NavBar'
import CreditCards from './components/creditCards/CreditCards'
import CreditCardShow from './components/creditCards/CreditCardShow'
import Profile from './components/user/Profile'
import NotFound from './components/utilities/NotFound'
import UnderConstruction from './components/utilities/UnderConstruction'

import theme from './components/styles/Theme'
import { ThemeProvider, createTheme } from '@mui/material/styles'

const App = () => {

  const [ mode, setMode ] = useState('light')

  return (
    <ThemeProvider theme={createTheme(theme(mode))}>
      <BrowserRouter>
        <NavBar mode={mode} setMode={setMode} />
        <Routes>
          <Route path='/' element={<Home mode={mode} />} />
          <Route path='/cards' element={<CreditCards />} />
          <Route path='/cards/:cardId' element={<CreditCardShow />} />
          <Route path='/profile/:userId' element={<Profile />} />
          <Route path='/learn' element={<UnderConstruction />} />
          <Route path='/bonuses' element={<UnderConstruction />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
    
  )
}

export default App
