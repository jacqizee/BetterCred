import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import NavBar from './components/common/NavBar'
import CreditCards from './components/CreditCards'
import CreditCardShow from './components/CreditCardShow'
import Profile from './components/Profile'

import theme from './components/Theme'
import { ThemeProvider, createTheme } from '@mui/material/styles'

const App = () => {

  const [ mode, setMode ] = useState('light')

  return (
    <ThemeProvider theme={createTheme(theme(mode))}>
      <BrowserRouter>
        <NavBar mode={mode} setMode={setMode} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cards' element={<CreditCards />} />
          <Route path='/cards/:cardId' element={<CreditCardShow />} />
          <Route path='/profile/:userId' element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
    
  )
}

export default App
