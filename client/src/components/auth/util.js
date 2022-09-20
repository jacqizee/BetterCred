export const handleSwap = (joinOpen, setJoinOpen, loginOpen, setLoginOpen, setFormErrors) => {
  setJoinOpen(!joinOpen)
  setLoginOpen(!loginOpen)
  setFormErrors(false)
}

export const handleOpen = (setModal) => {
  setModal(true)
}

export const handleClose = (setModal) => {
  setModal(false)
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