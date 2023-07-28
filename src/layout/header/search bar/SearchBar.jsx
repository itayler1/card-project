import { InputAdornment, TextField } from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '../../../providers/ThemeProvider';
import { useSearchBar } from '../../../providers/SearchBarProvider';

export default function SearchBar() {

    const {isDark} = useTheme();

    const {handleSearch, states} = useSearchBar();
    const searchBarInput = states.searchBarInput;
    const errors = states.errors;


  return (
    <TextField
        autoComplete='off'
        placeholder="Search"
        name='searchBar'
        variant='standard'
        value={searchBarInput}
        onChange={(e)=>handleSearch(e)}
        error={!!errors} 
        helperText={errors} 
        focused
        sx={{
            backgroundColor: isDark? 'inherit' : 'AppWorkspace',
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
                <SearchIcon edge='end'/>
            </InputAdornment>
          ),
          style: { padding: "0 8px" },
        }}
      />
  )
}
