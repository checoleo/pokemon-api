import React, {useState, useEffect,}  from 'react'
import SearchPokemon      from './SearchInput'
import AddPokemonButton   from './AddPokemonButton'
import PokemonTable       from './PokemonTable'
import PokemonForm        from './PokemonForm'
import PlusIcon from '../assets/Plus'
// import search

const useStyles = () => ({
  mainContainer: {
    margin: "auto",
    width: "50%",
    border: "3px solid black",
    padding: "30px"
  },
  topContainer: {
    height: "60px",
    justifyContent: "space-between",
    alignItems: "center",
    display: "flex",
  },
  searchContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
    width: "50%",
  },
  tittle:{
    margin: "0px",
  },  
});



const Pokedex = () => {
  const classes = useStyles()
  const [searchPokemon, setSearchPokemon] = useState("")
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [pokemonsList, setPokemonsList] = useState([]);

  const [closePokeForm, setClosePokeForm] = useState(false)


  useEffect(() => {
    fetch("https://bp-pokemons.herokuapp.com/?idAuthor=1")
      .then(response => response.json())
      .then(
        (result) => {
          console.log(result,"///")
          setIsLoaded(true);
          setPokemonsList(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  return(
    <div style={classes.mainContainer}>
      <p style={classes.tittle}>Listado de Pokemon</p>
      <div style={classes.topContainer}>
        <div>
          <SearchPokemon
            setSearchPokemon={setSearchPokemon}
          />
        </div>
        <div>
          <AddPokemonButton
            setClosePokeForm={setClosePokeForm}
            closePokeForm={closePokeForm}
          />
        </div>
      </div>
      <div>
      {pokemonsList &&
        <PokemonTable
        pokemonsList={
          pokemonsList.filter((pokemon) => {
            if (searchPokemon) {
              return (
                pokemon?.name?.toLowerCase().includes(searchPokemon.toLowerCase())
              );
            } else {
              return pokemonsList;
            }
          })
        }
        />
      }
      </div>
      <PokemonForm
        closePokeForm={closePokeForm}
        setClosePokeForm={setClosePokeForm}
        
      />
    </div>
  )
}

export default Pokedex;