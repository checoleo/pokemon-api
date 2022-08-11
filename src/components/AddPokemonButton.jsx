import React from 'react'
import AddSvg from './icons/AddSvg'

const useStyles = () => ({
  styledButton: {
    borderRadius: "2px",
    border: "none",
    color: "white",
    backgroundColor: "#6956F7",
    padding: "8px 10px",
    textAlign: "center",
    textDecoration: "none",
    fontSize: "12px",
    margin: "4px",
    cursor: "pointer",
    height: "35px",
    width: "80px",
    "&:disabled":{
      opacity: 1,
    }
  },
  insideButtonContainer:{
    display: "flex", 
    alignItems: "center", 
    justifyContent: "space-around",
  },
  buttonText:{
    margin: "2px 0 0 0",
  },

});

const StyledIconButton = (props) => {
  const classes = useStyles()
  const {setClosePokeForm} = props

  const handlePokeform = () => {
    setClosePokeForm(true)
  }

  return(
    <button style={classes.styledButton} onClick={handlePokeform}>
      <div style={classes.insideButtonContainer}>
        <AddSvg width="1em" height="1em" /> 
        <p style={classes.buttonText}>Nuevo</p>
      </div>
    </button>
  )
}
  
export default StyledIconButton;
