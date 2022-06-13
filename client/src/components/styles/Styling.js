export const flexCentered = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
}

export const flexRowCentered = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

export const loginModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90vw', md: '65vw' },
  bgcolor: 'background.paper',
  borderRadius: 18,
  boxShadow: 2,
  py: 5,
  px: 4,
  ...flexCentered,
}