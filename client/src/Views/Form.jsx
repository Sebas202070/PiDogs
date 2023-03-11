import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux"

import { createDogs, getAllTemperaments, showDog,} from '../Redux/actions'
import CardPet from './CardPet'
import styled from "./Form.module.css"

const validate = (form) => {
  let errors = {}
  if(!form.name) {
      errors.name = "*Nombre requerido"
  }
 else if (Number(form.name)) {
  errors.name = "*Texto requerido, no debe contener numeros"
	}
	 else if (!/^[a-zA-Z0-9 ]{0,25}$/.test(form.name)){
		errors.name = "*Por favor ingrese un Nombre"
	 }
 else if (form.name.length > 20) {
  errors.name = "*Nombre muy largo, maximo 30 caracteres"
	}
  else if(!form.min_weight) {
    errors.min_weight = "*Peso es requerido"
}
else if(parseInt(form.min_weight) < 1) {
  errors.min_weight = "*Peso minimo 1 Kg"
}

  else if(!form.height) {
      errors.height = "*Altura requerida"
  }
  else if(parseInt(form.height) < 10) {
    errors.height = "*Altura minima 10cms"
  }
  else if(!form.life_span) {
      errors.life_span = "*Tiempo de vida requerido, solo numeros"
  }
  else if(parseInt(form.life_span) < 1 || parseInt(form.life_span) > 100) {
    errors.life_span = "*El tiempo de vida debe ser entre 1 y 100 años"
  }
  return errors
}




function Form() {
  
const dispatch = useDispatch()
const temperamentsdb = useSelector(state => state.temperaments)
/* const showdog = useSelector(state => state.showDog) */
/* const[showdog, setShowdog] = useState(false) */
/* console.log("temps", temperamentsdb) */



const [input, setInput] = useState({
  name: "",
  min_height: "",
  max_height: "",
  min_weight: "",
  max_weight: "",
  min_life_span:  "",
  max_life_span: "",
  temperaments:[],
  

})

const [errors, setErrors] = useState({})

 useEffect(() => {
  dispatch(getAllTemperaments())
},[dispatch])
 
const handlerInput = (event) => {
  setInput({
    ...input,
    [event.target.name]: event.target.value
  })
setErrors(validate({
  ...input,
  [event.target.name]: event.target.value
}))
}


  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(createDogs(input))
    event.target.reset()
    setInput({
      name: "",
      min_height:"",
      max_height: "",
      min_weight: "",
      max_weight: "",
      min_life_span:"",
      max_life_span: "",
      temperaments:[]
    })
  /* setShowdog(true) */
}



const handlerTemperaments = (event) => {
  setInput({
    ...input,
    temperaments: [...input.temperaments, event.target.value]
  })
}
  return (
    <div className={styled.con}>
        <form onSubmit={(event)=> handleSubmit(event)}>
          
        <h1 className={styled.h1}>Crea tu propia Mascota!!</h1>
        <div className={styled.inputs}>
         
        <label className={styled.text} >*Nombre:  </label>
        <br />
        <input className={styled.input1} id='name1' type="text" onKeyPress={(event) => event.key === 'Enter' && handlerInput(event)} name='name' value={input.name} onChange={(event) => handlerInput(event)} ></input>
        {errors.name && (<p className={styled.error}>{errors.name}</p>)} 
        <br />
        <br />
    
        
        <label className={styled.text} >*Peso(Minimo,Maximo):  </label>
          <br />
        Min<input id='weight1' type="number" min="1" max="200" step="0.1" name='min_weight' value={input.min_weight} onChange={(event) => handlerInput(event)} placeholder="Ingrese peso minimo"></input> Kgs
        {errors.min_weight && (<p className={styled.error}>{errors.min_weight}</p>)} 
        <br />
        Max<input id='weight2' type="number" min="1" max="200" step="0.1" name='max_weight' value={input.max_weight} onChange={(event) => handlerInput(event)} placeholder="Ingrese peso maximo"></input> Kgs 
        {errors.max_weight && (<p className={styled.error}>{errors.max_weight}</p>)} 
       
        <br />
        <br />
        
   
        <label className={styled.text}>*Altura(Minima,Maxima):   </label>
          <br /> 
        Min<input id='height1' type="number" min="10" max="200" step="0.1" name='min_height' value={input.min_height} onChange={(event) => handlerInput(event)} placeholder="Ingrese altura minima"></input>Cms
        {errors.min_height && (<p className={styled.error}>{errors.min_height}</p>)} 
        <br />
        Max<input id='height2' type="number" min="10" max="200" step="0.1" name='max_height' value={input.max_height} onChange={(event) => handlerInput(event)} placeholder="Ingrese altura maxima" ></input>  Cms 
        {errors.max_height && (<p className={styled.error}>{errors.max_height}</p>)} 
        
        <br />
        <br />
        <label className={styled.text}>*Tiempo de Vida:  </label>
          <br />
        Min<input id='life_span1' type="number" min="10" max="100" name='min_life_span' value={input.min_life_span} onChange={(event) => handlerInput(event)} ></input>Años
        {errors.life_span && (<p className={styled.error}>{errors.life_span}</p>)} 
        <br />
        Max<input id='life_span2' type="number" min="10" max="100" name='max_life_span' value={input.max_life_span} onChange={(event) => handlerInput(event)} ></input>Años 
        {errors.life_span && (<p className={styled.error}>{errors.life_span}</p>)} 
        <br />
        {/* <label>Temperaments: </label>
                          

                            <select  name='temperaments'  value={input.temperaments} onChange={(event) => handlerTemperaments(event)}>
								<option>Select Temperaments</option>
								{
									temperamentsdb?.map(g => (<option key={g.id} value={g.name}>{g.name}</option>)) 
								}
							</select>
              <ul><li key='selectedTemps'>Selected genres: {input.temperaments.map(g => g + ',')}</li></ul> */}
             

             <label className={styled.text}>Temperamentos: </label>
             <br />
              <select onChange={(e) => handlerTemperaments(e)} >
                {temperamentsdb.map((temp) => {
                  return (
                    <option key={temp} name={temp}>
                      {temp}
                    </option>
                  );
                })}
              </select>
              <ul><li className={styled.temps} key='selectedTemps'>Temperamentos seleccionados: {input.temperaments.map(g => g + ',')}</li></ul>
              {errors.temperaments && (<p className={styled.error}>{errors.temperaments}</p>)} 
              {/* <div className={styles.sidebar_box}>
                <h4>You have selected that:</h4>
                {input.temperaments.map((el) => (
                  <div key={el} className={styles.selectedItems}>
                    <p>{el}</p> */}
                 
<br />

        <button className={styled.button} disabled={errors.name || errors.min_height || errors.max_height || errors.min_weight || errors.max_weight || errors.life_span || !input.name}>Crear!!</button>
        
        </div>
        <label className={styled.temps1}>*Campos Obligatorios</label>
        </form>
    {/*    {showdog && <CardPet
        name={input.name}
        />} */}
          
        
       
        
    </div>
    




  )
}

export default Form