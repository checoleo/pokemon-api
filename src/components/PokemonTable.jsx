import React, { useState} from "react";
// import editIcon from '../assets/edit.svg';
// import deleteIcon from '../assets/delete.svg'
import DeleteSvg from './icons/DeleteSvg'
import EditSvg from './icons/EditSvg'
import PokemonForm from "./PokemonForm";

const useStyles = () => ({
  mainTable: {
  border: "2px solid gray",
  width: "100%",
  fontSize: "16px",
  borderCollapse: "collapse",
  padding: "20px"
  },
  pokemonImage:{
    width: "40px"
  },
  iconButtonContainer:{
    justifyContent: "space-around",
    alignItems: "center",
    display: "flex",
  },
  iconButton: {
    borderRadius: "2px",
    border: "none",
    background: "transparent",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "12px",
    cursor: "pointer",
    // height: "30px",
    // width: "90px"
  },
  trTable:{
    height: "40px",
  },
  thTable:{
    width: "20%",
    border: "2px solid gray",
    height: "40px",
  },
  tdTable:{
    paddingLeft: "20px",
    border: "2px solid gray",
  },
  tdImg:{
    border: "1px solid gray",
    justifyContent: "space-around",
    alignItems: "center",
    display: "flex",
  }

});


const PokemmonTable = (props) => {

  const classes = useStyles()
  const { 
    pokemonsList,
    setPokemonInfo
  } = props
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);



 
  const deletePokemon = (data) => {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        id: data.id,
        idAuthor: 1,
      })
    };
    fetch(`https://bp-pokemons.herokuapp.com/:${data.id}`, requestOptions)
      .then(response => response.json())
      .then(
        (result) =>{
          console.log(result,")))DELETE(((")
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }

  return(
    <>
      <table style={classes.mainTable}>
        <thead>
          <tr style={classes.trTable}>
            <th style={classes.thTable}>Nombre</th>
            <th style={classes.thTable}>Imagen</th>
            <th style={classes.thTable}>Ataque</th>
            <th style={classes.thTable}>Defensa</th>
            <th style={classes.thTable}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {    
            pokemonsList.map((pokemon)=>{
              return(
                <tr key={pokemon.id} style={classes.trTable}>
                  <td style={classes.tdTable}>{pokemon.name}</td>
                  <td style={classes.tdImg}><img src={pokemon.image} alt={pokemon.name} style={classes.pokemonImage}/></td>
                  <td style={classes.tdTable}>{pokemon.attack}</td>
                  <td style={classes.tdTable}>{pokemon.defense}</td>
                  <td style={classes.tdTable}>
                    <div style={classes.iconButtonContainer}>
                      <button 
                        style={classes.iconButton}
                        onClick={() => {
                          const currentPokemon = pokemon.id
                          const datatoEdit = pokemonsList.find((pokemon) => {
                            return pokemon.id === Number(currentPokemon);
                          });
                          console.log({...datatoEdit})
                          setPokemonInfo(datatoEdit)
                          // handlePokemonData({ ...datatoEdit });
                        }}
                      >
                        <EditSvg width="1em" height="1em"/>
                      </button>
                      <button 
                        style={classes.iconButton}
                        onClick={() => {
                          const currentPokemon = pokemon.id
                          const datatoEdit = pokemonsList.find((pokemon) => {
                            return pokemon.id === Number(currentPokemon);
                          });
                          deletePokemon(datatoEdit)
                        }}
                      >
                        <DeleteSvg width="1em" height="1em"/>
                      </button>
                    </div>

                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      {/* <PokemonForm
      
      /> */}

    </>
  )
}

export default PokemmonTable;
