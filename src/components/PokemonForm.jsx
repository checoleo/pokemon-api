import React, {useState} from "react";
import { useEffect } from "react";
import CLoseSVG from './icons/CloseSvg';
import SaveSVG from './icons/SaveSvg';

const useStyles = () => ({
  saveInfoContainer: {
    display: (props) => (props.closePokeForm ? "flex" : "none"),
    // display: "none",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "30px",
    border: "3px solid gray",
  },
  statusContainer:{
    justifyContent: "space-between",
    alignItems: "center",
    display: "flex",
  },
  inputTextContainer:{
    marginLeft: "30px",
    alignItems: "center",
    display: "flex",
  },
  inputRangeContainer:{
    justifyContent: "flex-end",
    alignItems: "center",
    display: "flex",
  },
  optionsButtonContainer:{
    marginTop: "20px",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    height: "60px",
  },
  labelText:{
    width: "60px"
  },
  marginText:{
    marginRight: "10px",
  },
  inputText:{
    border: "2px solid gray",
    borderRadius: "2px",
    padding: "2px 15px",
    width: "110px",
    height: "25px",
    textAlign: "left",
    textDecoration: "none",
  },
  styledButton: {
    borderRadius: "2px",
    border: "none",
    color: "white",
    backgroundColor: "#6956F7",
    padding: "8px 12px",
    textAlign: "center",
    textDecoration: "none",
    fontSize: "12px",
    margin: "4px",
    cursor: "pointer",
    height: "35px",
    width: "100px",
    "&:disabled":{
      background: "gray",
      pointer: "none",
    }
  },
  inputRange:{
    accentColor: "#6956F7",
    cursor: "pointer"
  },
  buttonText:{
    margin: "2px 0 0 0",
  },
  insideButtonContainer:{
    display: "flex", 
    alignItems: "center", 
    justifyContent: "space-around",
  }
})

const PokemonForm = (props) => {
  const {
    closePokeForm, 
    pokemonInfo

  } = props
  const classes = useStyles(closePokeForm)

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  console.log(pokemonInfo, "info")
  const [namePokemon, setNamePokemon] = useState("");
  const [urlImage, setUrlImage] = useState("");
  const [attackPokemon, setAttackPokemon] = useState();
  const [defensePokemon, setDefensePokemon] = useState();
  const [pokemonId, setPokemonId] = useState(0)

  useEffect(()=>{
    setNamePokemon(pokemonInfo.name)
    setUrlImage(pokemonInfo.image)
    setAttackPokemon(pokemonInfo.attack )
    setDefensePokemon(pokemonInfo.defense)
    setPokemonId(pokemonInfo.id)
  },[pokemonInfo])

  const addPokemonToList = () => {
 
    if(pokemonInfo){
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: `${namePokemon}`, 
          image: `${urlImage}`,
          attack: attackPokemon,
          defense: defensePokemon,
          hp: 50,
          type: "lucha",
          id: pokemonId,
          idAuthor: 1,
        })
      };
      fetch(`https://bp-pokemons.herokuapp.com/:${pokemonId}`, requestOptions)
        .then(response => response.json())
        .then(
          (result) =>{
            console.log(result,")))UPDATE(((")
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }else{
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: `${namePokemon}`, 
          image: `${urlImage}`,
          attack: attackPokemon,
          defense: defensePokemon,
          hp: 100,
          type: "lucha",
          idAuthor: 1,
        })
      };
      fetch('https://bp-pokemons.herokuapp.com/?idAuthor=1', requestOptions)
        .then(response => response.json())
        .then(
          (result) =>{
            console.log(result,")))FETCH(((")
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }
  }
  
  const handleName = (event) => {
    setNamePokemon(event.target.value)
  }

  const handleUrl = (event) => {
    setUrlImage(event.target.value)
  }

  const attackChange = (event) => {
    setAttackPokemon(event.target.value)
  }

  const defenseChange = (event) => {
    setDefensePokemon(event.target.value)
  }



  // console.log(closePokeForm, "____")
  return(
    <div style={classes.saveInfoContainer}>
      <div style={{textAlign: "center"}}>
        <p>Nuevo Pokemon</p>
      </div>
      <div style={classes.statusContainer}>
        <div style={classes.inputTextContainer}>
          <label style={classes.labelText}>Nombre:</label>
          <input 
            value={namePokemon}
            type="text" 
            id="name" 
            name="name" 
            style={classes.inputText}
            onChange={handleName}
          ></input>
        </div>
        <div style={classes.inputRangeContainer}>
          <h4 style={classes.marginText}>Ataque:</h4>
          <h4 style={classes.marginText}>0</h4>
          <input 
            value={attackPokemon}
            type="range" 
            min="0" 
            max="100" 
            step="1" 
            onChange={attackChange}
            style={classes.inputRange}
          ></input>
          <h4 style={classes.marginText}>100</h4>
        </div>
      </div>
      <div style={classes.statusContainer}>
        <div style={classes.inputTextContainer}>
          <label style={classes.labelText}>Imagen:</label>
          <input
            value={urlImage || ""}
            type="text" 
            id="image" 
            name="image" 
            placeholder="Url" 
            style={classes.inputText}
            onChange={handleUrl}
          ></input>
        </div>
        <div style={classes.inputRangeContainer}>
          <h4 style={classes.marginText}>Defensa:</h4>
          <h4 style={classes.marginText}>0</h4>
          <input 
            value={defensePokemon}
            type="range" 
            min="0" 
            max="100" 
            step="1" 
            onChange={defenseChange}
            style={classes.inputRange}
          ></input>
          <h4 style={classes.marginText}>100</h4>
        </div>
      </div>
      <div style={classes.optionsButtonContainer}>
        <button type="button" style={classes.styledButton} onClick={addPokemonToList}>
          <div style={classes.insideButtonContainer}>
            <SaveSVG width="15px" height="15px" /> 
            <p style={classes.buttonText}>Guardar</p>
          </div>
        </button>
        <button style={classes.styledButton} onClick={()=>{console.log("canceled","//")}}>
          <div style={classes.insideButtonContainer}>
            <CLoseSVG width="15px" height="15px" /> 
            <p style={classes.buttonText}>Cancelar</p>
          </div>
        </button>
      </div>
    </div>
  )
}

export default PokemonForm;
