// MUI
import { createSvgIcon } from '@mui/material/utils'
import Chip from '@mui/material/Chip'
import Icon from '@mui/material/Icon'

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

const Poor = createSvgIcon(
  <path fill="currentColor" d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12C4,14.4 5,16.5 6.7,18C8.1,16.7 10,16 12,16C14,16 15.8,16.7 17.3,18C19,16.5 20,14.4 20,12A8,8 0 0,0 12,4M14,6A1,1 0 0,1 15,7A1,1 0 0,1 14,8A1,1 0 0,1 13,7A1,1 0 0,1 14,6M10,6A1,1 0 0,1 11,7A1,1 0 0,1 10,8A1,1 0 0,1 9,7A1,1 0 0,1 10,6M6.91,8.94C7.04,8.94 7.16,8.97 7.3,9L10.5,10.32L10.77,10.43C11.33,10 12.09,9.88 12.75,10.15C13.77,10.56 14.27,11.73 13.85,12.75C13.44,13.77 12.27,14.27 11.25,13.85C10.59,13.59 10.12,13 10,12.28L9.77,12.18L6.55,10.88L6.53,10.87C6,10.66 5.77,10.08 5.97,9.56C6.13,9.18 6.5,8.93 6.91,8.94V8.94M17,9A1,1 0 0,1 18,10A1,1 0 0,1 17,11A1,1 0 0,1 16,10A1,1 0 0,1 17,9Z" />,
  'Poor'
)

const Fair = createSvgIcon(
  <path fill="currentColor" d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12C4,14.4 5,16.5 6.7,18C8.1,16.7 10,16 12,16C14,16 15.8,16.7 17.3,18C19,16.5 20,14.4 20,12A8,8 0 0,0 12,4M10,5.89C10.38,5.9 10.74,6.15 10.9,6.54L12.19,9.77L12.29,10C13,10.13 13.59,10.6 13.86,11.26C14.27,12.29 13.77,13.45 12.74,13.86C11.71,14.27 10.55,13.77 10.14,12.74C9.88,12.08 10,11.32 10.43,10.76L10.33,10.5L9.04,7.29L9.03,7.26C8.83,6.75 9.08,6.17 9.59,5.96C9.72,5.91 9.85,5.89 10,5.89V5.89M14,6A1,1 0 0,1 15,7A1,1 0 0,1 14,8A1,1 0 0,1 13,7A1,1 0 0,1 14,6M17,9A1,1 0 0,1 18,10A1,1 0 0,1 17,11A1,1 0 0,1 16,10A1,1 0 0,1 17,9M7,9A1,1 0 0,1 8,10A1,1 0 0,1 7,11A1,1 0 0,1 6,10A1,1 0 0,1 7,9Z" />,
  'Fair'
)

const Good = createSvgIcon(
  <path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12C20,14.4 19,16.5 17.3,18C15.9,16.7 14,16 12,16C10,16 8.2,16.7 6.7,18C5,16.5 4,14.4 4,12A8,8 0 0,1 12,4M14,5.89C13.62,5.9 13.26,6.15 13.1,6.54L11.81,9.77L11.71,10C11,10.13 10.41,10.6 10.14,11.26C9.73,12.29 10.23,13.45 11.26,13.86C12.29,14.27 13.45,13.77 13.86,12.74C14.12,12.08 14,11.32 13.57,10.76L13.67,10.5L14.96,7.29L14.97,7.26C15.17,6.75 14.92,6.17 14.41,5.96C14.28,5.91 14.15,5.89 14,5.89M10,6A1,1 0 0,0 9,7A1,1 0 0,0 10,8A1,1 0 0,0 11,7A1,1 0 0,0 10,6M7,9A1,1 0 0,0 6,10A1,1 0 0,0 7,11A1,1 0 0,0 8,10A1,1 0 0,0 7,9M17,9A1,1 0 0,0 16,10A1,1 0 0,0 17,11A1,1 0 0,0 18,10A1,1 0 0,0 17,9Z" />,
  'Good'
)

const Excellent = createSvgIcon(
  <path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12C20,14.4 19,16.5 17.3,18C15.9,16.7 14,16 12,16C10,16 8.2,16.7 6.7,18C5,16.5 4,14.4 4,12A8,8 0 0,1 12,4M10,6A1,1 0 0,0 9,7A1,1 0 0,0 10,8A1,1 0 0,0 11,7A1,1 0 0,0 10,6M14,6A1,1 0 0,0 13,7A1,1 0 0,0 14,8A1,1 0 0,0 15,7A1,1 0 0,0 14,6M17.09,8.94C16.96,8.94 16.84,8.97 16.7,9L13.5,10.32L13.23,10.43C12.67,10 11.91,9.88 11.25,10.15C10.23,10.56 9.73,11.73 10.15,12.75C10.56,13.77 11.73,14.27 12.75,13.85C13.41,13.59 13.88,13 14,12.28L14.23,12.18L17.45,10.88L17.47,10.87C18,10.66 18.23,10.08 18.03,9.56C17.87,9.18 17.5,8.93 17.09,8.94M7,9A1,1 0 0,0 6,10A1,1 0 0,0 7,11A1,1 0 0,0 8,10A1,1 0 0,0 7,9Z" />,
  'Excellent'
)

export const creditRangeIcon = (creditRange) => {
  switch (creditRange) {
    case 1:
      return <Chip icon={<Poor />} label='Poor' color='primary' />
    case 2:
      return <Chip icon={<Fair />} label='Fair' color='primary' />
    case 3:
      return <Chip icon={<Good />} label='Good' color='primary' />
    case 4:
      return <Chip icon={<Excellent />} label='Excellent' color='primary' />
  }
}

export const iconStyle = {
  borderRadius: 5,
  bgcolor: 'primary.dark',
  color: 'white',
  m: .5,
}

export const rewardIcon = (category) => {
  switch (category) {
    case 1:
      return <Icon sx={ iconStyle }><RestaurantRoundedIcon sx={{ p: .5 }} /></Icon>
    case 2:
      return <Icon sx={ iconStyle }><LocalGasStationRoundedIcon sx={{ p: .5 }} /></Icon>
    case 3:
      return <Icon sx={ iconStyle }><AirplaneTicketRoundedIcon sx={{ p: .5 }} /></Icon>
    case 4:
      return <Icon sx={ iconStyle }><LiveTvRoundedIcon sx={{ p: .5 }} /></Icon>
    case 5:
      return <Icon sx={ iconStyle }><ThreeSixtyRoundedIcon sx={{ p: .5 }} /></Icon>
    case 6:
      return <Icon sx={ iconStyle }><DirectionsTransitRoundedIcon sx={{ p: .5 }} /></Icon>
    case 7:
      return <Icon sx={ iconStyle }><LocalGroceryStoreRoundedIcon sx={{ p: .5 }} /></Icon>
    case 8:
      return <Icon sx={ iconStyle }><MedicationRoundedIcon sx={{ p: .5 }} /></Icon>
    case 9:
      return <Icon sx={ iconStyle }><AttractionsRoundedIcon sx={{ p: .5 }} /></Icon>
  }
}