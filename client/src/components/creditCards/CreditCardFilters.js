// MUI Components
import { Box, Button, TextField, FormControl, MenuItem, Select } from '../styles/MaterialUI'

// Icons
import SearchIcon from '@mui/icons-material/Search'

const CreditCardFilters = ({ cardFilters, setCardFilters, searchTerm, setSearchTerm }) => {

  const handleFilterClick = (e) => {
    if (cardFilters[e.target.name] === e.target.value) {
      setCardFilters({ ...cardFilters, [e.target.name]: '' })
    } else {
      setCardFilters({ ...cardFilters, [e.target.name]: e.target.value })
    }
  }

  return (
    <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
      {/* Search Box */}
      <Box sx={{ display: 'flex', alignItems: 'flex-end', color: 'primary.contrastText', mr: 2 }}>
        <SearchIcon sx={{ my: 0.5, mr: 1 }} />
        <TextField
          name='search-field'
          value={searchTerm}
          label='Search'
          variant='outlined'
          size='small'
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>

      {/* Sort by Annual Fee */}
      <FormControl sx={{ width: 'fit-contents', mr: 2 }}>
        <Select
          labelId="sort-fee"
          displayEmpty
          id="sort-fee"
          name="annualFee"
          value={cardFilters.annualFee}
          size='small'
          onChange={handleFilterClick}
        >
          <MenuItem value={''} selected disabled>Annual Fee</MenuItem>
          <MenuItem value={'low'}>Low to High</MenuItem>
          <MenuItem value={'high'}>High to Low</MenuItem>
        </Select>
      </FormControl>

      {/* Filter by Credit Score */}
      <FormControl sx={{ width: 'fit-contents', mr: 2 }}>
        <Select
          labelId="filter-credit"
          displayEmpty
          id="filter-credit"
          value={cardFilters.creditScore}
          name="creditScore"
          size='small'
          onChange={handleFilterClick}
        >
          <MenuItem value={''} selected disabled>Credit Score</MenuItem>
          <MenuItem value={'Bad'}>Bad</MenuItem>
          <MenuItem value={'Fair'}>Fair</MenuItem>
          <MenuItem value={'Good'}>Good</MenuItem>
          <MenuItem value={'Excellent'}>Excellent</MenuItem>
        </Select>
      </FormControl>
      
      <Button onClick={() => setCardFilters({
        annualFee: '',
        creditScore: '',
      })}>Clear</Button>

    </Box>
  )
}

export default CreditCardFilters