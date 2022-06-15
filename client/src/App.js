import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import NavBar from './components/common/NavBar'
import CreditCards from './components/creditCards/CreditCards'
import CreditCardShow from './components/creditCards/CreditCardShow'
import EditProfile from './components/user/EditProfile'
import NotFound from './components/utilities/NotFound'

import theme from './components/styles/Theme'
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
          <Route path='/profile/:userId' element={<EditProfile />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
    
  )
}

export default App
