export const getLocalToken = () => {
  return window.localStorage.getItem('bettercred')
}

export const getPayload = () => {
  const token = getLocalToken()
  if (!token) return
  const payload = token.split('.')[1]
  return JSON.parse(atob(payload))
}

export const confirmUser = (userId) => {
  const payload = getPayload()
  return payload.sub === parseInt(userId)
}

export const handleLogOut = () => {
  window.localStorage.removeItem('bettercred')
  window.location.replace('/cards')
}

export const registerForm = {
  username: '',
  email: '',
  first_name: '',
  last_name: '',
  password: '',
  password_confirmation: '',
  profile_picture: '',
}

export const loginForm = {
  username: '',
  password: '',
}

export const handleFormChange = (e, setFormData, formData) => {
  setFormData({ ...formData, [e.target.name]: e.target.value })
}

// export const handleSwap = (e, setJoinOpen, joinOpen, setLoginOpen, loginOpen) => {
//   setJoinOpen(joinOpen)
//   setLoginOpen(loginOpen)
// }