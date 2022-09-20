import Icon from '@mui/material/Icon'
import Box from '@mui/material/Box'

// Icons
import RestaurantRoundedIcon from '@mui/icons-material/RestaurantRounded'
import LocalGasStationRoundedIcon from '@mui/icons-material/LocalGasStationRounded'
import AirplaneTicketRoundedIcon from '@mui/icons-material/AirplaneTicketRounded'
import LiveTvRoundedIcon from '@mui/icons-material/LiveTvRounded'
import ThreeSixtyRoundedIcon from '@mui/icons-material/ThreeSixtyRounded'
import DirectionsTransitRoundedIcon from '@mui/icons-material/DirectionsTransitRounded'
import LocalGroceryStoreRoundedIcon from '@mui/icons-material/LocalGroceryStoreRounded'
import MedicationRoundedIcon from '@mui/icons-material/MedicationRounded'
import AttractionsRoundedIcon from '@mui/icons-material/AttractionsRounded'
import HorizontalRuleRoundedIcon from '@mui/icons-material/HorizontalRuleRounded'

const rewardIcons = {
  'Restaurants': <RestaurantRoundedIcon sx={{ p: .5 }} />,
  'Gas Stations': <LocalGasStationRoundedIcon sx={{ p: .5 }} />,
  'Travel': <AirplaneTicketRoundedIcon sx={{ p: .5 }} />,
  'Streaming Services': <LiveTvRoundedIcon sx={{ p: .5 }} />,
  'Rotating': <ThreeSixtyRoundedIcon sx={{ p: .5 }} />,
  'Transit': <DirectionsTransitRoundedIcon sx={{ p: .5 }} />,
  'Grocery Stores': <LocalGroceryStoreRoundedIcon sx={{ p: .5 }} />,
  'Drugstores': <MedicationRoundedIcon sx={{ p: .5 }} />,
  'Entertainment': <AttractionsRoundedIcon sx={{ p: .5 }} />,
  'None': <HorizontalRuleRoundedIcon sx={{ p: .5 }} />,
}

const iconStyle = {
  borderRadius: 5,
  bgcolor: 'primary.dark',
  color: 'white',
  m: .5,
}

const CashBackIcon = ({ category }) => {
  return (
    <Box sx={{ color: 'secondary.contrastText' }}>
      <Box sx={{ color: 'secondary.contrastText' }}>
        <Icon sx={ iconStyle }>{rewardIcons[category]}</Icon>
      </Box>
    </Box>
  )
}

export default CashBackIcon