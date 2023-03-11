import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogsByName } from "../Redux/actions";
import styled from "./Search.module.css"

/* import styles from "./SearchBar.module.css"; */

export default function Search() {
  const [dogState, setDogsState] = useState("");
  const dispatch = useDispatch();

  function handleClick(e) {
    e.preventDefault();
    
    if (dogState.length === 0) {
      return alert("Por favor ingrese un nombre");
    } 
	else if (Number(dogState)) {
		return alert("Por favor ingrese un nombre sin numeros")
	}
	else if (!dogState) {
		return alert("La macota no se encuentra!!")
	}
	 else if (!/^[a-zA-Z0-9 ]{0,25}$/.test(dogState)){
		return alert("Por favor ingrese un nombre sin simbolos ni numeros") 
	 }
	else if (dogState.length > 30) {
		alert("Nombre muy largo!!");
	}
	
	else {
      dispatch(getDogsByName(dogState));
      setDogsState("");
    }
  }

  return (
    <div> 
		<label className={styled.label}>Busca una mascota:   </label>
      <input
        type="text"
		onKeyPress={e => e.key === 'Enter' && handleClick(e)}
        value={dogState}
        onChange={(e) => setDogsState(e.target.value)}
      />
      <button type="submit" onClick={handleClick}>
        <span className="material-icons">Buscar</span>
      </button>
    </div>
  );
}
























/* import { useState } from "react";
import { useDispatch } from "react-redux";
import { getVideogamesByName } from "../Redux/actions";









export function Search (){
	const dispatch = useDispatch()
	const [name, setName] = useState('');
	const handlerChange = (event) => {
		event.preventDefault()
		setName(event.target.value)
	}
	const handlerSubmit = (event) => {
		event.preventDefault();
		if(!name.length) alert('Insert a name!');
		else if (!/^[a-zA-Z0-9 ]{0,25}$/.test(name)){
			alert('Name invalid')
		}
		else {
			/* dispatch(cleanSearch())  */
			/* dispatch(getVideogamesByName(name));
			setName('')
			  */
	/* 	
		}
	}
	return(
			<form  className="search-container" onSubmit={handlerSubmit}>
				<input className="search-input" type="text" placeholder=" Insert name..." value={name} onChange={handlerChange}/>
				<div className='search-btn'>
					<button onChange={(event)=> handlerSubmit(event)} className="s-btn" type="submit">Search</button>
				</div>
			</form>
	)
} */ 



