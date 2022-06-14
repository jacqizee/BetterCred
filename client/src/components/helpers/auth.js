export const getLocalToken = () => {
  return window.localStorage.getItem('bettercred')
}

export const getPayload = () => {
  const token = getLocalToken()
  if (!token) return
  const payload = token.split('.')[1]
  return JSON.parse(atob(payload))
}

export const userIsOwner = () => {
  const payload = getPayload()
  console.log(payload)
}