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