// MUI Components
import Switch from '@mui/material/Switch'

// Icons
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded'
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded'

export const DarkModeSwitch = ({ mode, switchStatus, handleModeChange }) => {
  return (
    <Switch 
      checked={switchStatus}
      onChange={handleModeChange}
      value={mode}
      color='secondary'
      icon={<LightModeRoundedIcon sx={{ bgcolor: '#000', borderRadius: 5, p: .5 }} />}
      checkedIcon={<DarkModeRoundedIcon sx={{ bgcolor: '#fff', borderRadius: 5, p: .5 }} />}
    />
  )
}