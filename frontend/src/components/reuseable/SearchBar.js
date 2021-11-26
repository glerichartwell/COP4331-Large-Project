import React, { useRef } from "react";
import SearchIcon from '@mui/icons-material/Search';
import './css/SearchBar.css'
import Search from "./Search";
import SearchIconWrapper from "./SearchIconWrapper";
import StyledInputBase from "./StyledInputBase";

const SearchBar = props => {
  
  const ref = useRef(null)

  return (
    <form id='search-bar' onSubmit={ (e) =>{e.preventDefault(); props.getQueryRef(ref.current.value)}}>
    <Search id="search">
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        inputRef={ref}
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
      />
    </Search>
    </form>
  );
};

export default SearchBar;
