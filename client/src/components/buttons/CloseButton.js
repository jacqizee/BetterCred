import { IconButton } from '../styles/MaterialUI'
import { handleClose } from '../auth/util'

import CloseIcon from '@mui/icons-material/Close'

const CloseButton = ({ setModalOpen }) => {
  return (
    <IconButton onClick={() => handleClose(setModalOpen)} sx={{ position: 'fixed', right: '2.25rem', top: '1.25rem' }} >
      <CloseIcon />
    </IconButton>
  )
}

export default CloseButton