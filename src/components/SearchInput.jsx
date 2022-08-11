import React, { useState } from 'react'

// import searchIcon from '../assets/search.svg'

const useStyles = () => ({
  inputSearch: {
    border: "2px solid gray",
    borderRadius: "2px",
    padding: "2px 15px",
    width: "110px",
    height: "20px",
    textAlign: "center",
    textDecoration: "none",
    justifyContend: "flex-start",
    textAlign: "left"
  }
});

const SearchInput = (props) => {
  const classes = useStyles()
  const {searchPokemon, setSearchPokemon} = props

  const handleCHange = (event) => {
    setSearchPokemon(event.target.value)
  }

  return(
    <input 
      type="text" 
      id="search" 
      name="search" 
      style={classes.inputSearch}
      value={searchPokemon}
      onChange={handleCHange}
      // placeholder={<img src={searchIcon}/>}
      placeholder="Buscar"
    ></input>
  )
}

export default SearchInput;
