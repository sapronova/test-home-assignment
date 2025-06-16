import SearchIcon from '@mui/icons-material/Search'
import { TextField, InputAdornment, useTheme } from '@mui/material'

interface SearchBarProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
}

const SearchBar = ({ searchTerm, setSearchTerm }: SearchBarProps) => {
  const theme = useTheme()

  return (
    <TextField
      placeholder="Type to search"
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
      variant="standard"
      fullWidth
      sx={{
        '& .MuiInputBase-root': {
          height: '100%',
          backgroundColor: 'white',
          px: 1,
        },
        '& .MuiInput-underline:before, & .MuiInput-underline:after': {
          borderBottom: 'none',
        },
      }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ fontSize: 16, color: theme.palette.grey[400] }} />
            </InputAdornment>
          ),
          disableUnderline: true,
        },
      }}
    />
  )
}

export default SearchBar
