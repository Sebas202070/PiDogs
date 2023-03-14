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
    errors.min_weight = "*Peso minimo es requerido, solo numeros"
}
else if(parseInt(form.min_weight) < 1) {
  errors.min_weight = "*Peso minimo 1 Kg"
}
else if(!form.max_weight) {
  errors.max_weight = "*Peso maximo es requerido"
}
else if(parseInt(form.max_weight) > 100) {
errors.max_weight = "*Peso maximo 100 Kgs"
}


  else if(!form.min_height) {
      errors.height = "*Altura requerida"
  }
  else if(parseInt(form.min_height) < 10) {
    errors.height = "*Altura minima 10cms"
  }
  else if(!form.max_height) {
    errors.height = "*Altura requerida"
}
else if(parseInt(form.max_height) >  100) {
  errors.height = "*Altura maxima 100 cms"
}
  else if(!form.min_life_span) {
      errors.life_span = "*Tiempo de vida requerido"
  }

else if(parseInt(form.min_life_span) < 1){
    errors.min_life_span = "*Tiempo de vida minimo 1 año"
}
  else if(parseInt(form.max_life_span) > 100 || parseInt(form.life_span) > 100) {
    errors.max_life_span = "*Tiempo de vida maximo 100 años"
  }
  return errors
}

/* const validateSucces = (form) => { */
/*   let succes = {} */
/*   if(form.name && form.min_height) { */
/*     succes.message = "Creado" */
/*   } */
/* } */




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
const [succes, setSucces] = useState({})

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
/* setSucces(succes({ */
/*   ...input, */
/*   [event.target.name]: event.target.value */
/* })) */
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
/* const check = document.getElementById("Formulario") */
/* check.addEventListener("submit", (e) => { */
/*   e.preventDefault() */
/*   if(input.name && input.min_height) { */
/*     check.reset() */
/*   } */
/* }) */
/*  */



const handlerTemperaments = (event) => {
  setInput({
    ...input,
    temperaments: [...input.temperaments, event.target.value]
  })
}
  const handleDelete = (el) => {
    setInput({
        ...input,
        temperaments: input.temperaments.filter(temp => temp !== el)
    })
}

  

  return (
    <div className={styled.con}>
        <form id='Formulario' onSubmit={(event)=> handleSubmit(event)}>
          
        <h1 className={styled.h1}>Crea tu propia Mascota!!</h1>
        <div className={styled.inputs}>
         
        <label className={styled.text} >*Nombre:  </label>
        
        <input className={styled.input1} id='name1' type="text" onKeyPress={(event) => event.key === 'Enter' && handlerInput(event)} name='name' value={input.name} onChange={(event) => handlerInput(event)} ></input>
        {errors.name && (<p className={styled.error}>{errors.name}</p>)} 
        <br />
        <br />
    
        
        <label className={styled.text} >*Peso(Minimo,Maximo):  </label>
          <br />
        Min(1)<input id='weight1' type="number" min="1" max="100"  name='min_weight' value={input.min_weight} onChange={(event) => handlerInput(event)} placeholder="Ingrese peso minimo"></input> Kgs
        {errors.min_weight && (<p className={styled.error}>{errors.min_weight}</p>)} 
        <br />
        Max(100)<input id='weight2' type="number" min="1" max="100"  name='max_weight' value={input.max_weight} onChange={(event) => handlerInput(event)} placeholder="Ingrese peso maximo"></input> Kgs 
        {errors.max_weight && (<p className={styled.error}>{errors.max_weight}</p>)} 
       
        <br />
        <br />
        
   
        <label className={styled.text}>*Altura(Minima,Maxima):   </label>
          <br /> 
        Min(10)<input id='height1' type="number" min="10" max="200" step="0.1" name='min_height' value={input.min_height} onChange={(event) => handlerInput(event)} placeholder="Ingrese altura minima"></input>Cms
        {errors.min_height && (<p className={styled.error}>{errors.min_height}</p>)} 
        <br />
        Max(200)<input id='height2' type="number" min="10" max="200" step="0.1" name='max_height' value={input.max_height} onChange={(event) => handlerInput(event)} placeholder="Ingrese altura maxima" ></input>  Cms 
        {errors.max_height && (<p className={styled.error}>{errors.max_height}</p>)} 
        
        <br />
        <br />
        <label className={styled.text}>*Tiempo de Vida:  </label>



        
          <br />
        Min(10)<input id='life_span1' type="number" min="20" max="100" name='min_life_span' value={input.min_life_span} onChange={(event) => handlerInput(event)} ></input>Años
        {errors.life_span && (<p className={styled.error}>{errors.life_span}</p>)} 
        <br />
        Max(100)<input id='life_span2' type="number" min="20" max="100" name='max_life_span' value={input.max_life_span} onChange={(event) => handlerInput(event)} ></input>Años 
        {errors.life_span && (<p className={styled.error}>{errors.life_span}</p>)} 
        <br />
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
              <ul className={styled.ul}><li className={styled.temps} key='selectedTemps'>Temperamentos seleccionados: {input.temperaments.map(g => <p key={g}  onClick={() => handleDelete(g)}>  <p className={styled.li}><div className={styled.x}>x</div>{`${g + ' , '}`}</p></p> /* g + ',' */)} </li></ul>
              {errors.temperaments && (<p className={styled.error}>{errors.temperaments}</p>)} 
              {/* <div className={styles.sidebar_box}>
                <h4>You have selected that:</h4>
                {input.temperaments.map((el) => (
                  <div key={el} className={styles.selectedItems}>
                    <p>{el}</p> */}
                 
<br />

        <button type='submit' className={styled.button} disabled={errors.name || errors.min_height || errors.max_height || errors.min_weight || errors.max_weight || errors.min_life_span || !input.name || !input.min_weight || !input.max_weight|| !input.min_height || !input.max_height || !input.min_life_span || !input.max_life_span}>Crear!!</button>
        {succes.message}
        </div>
        <label className={styled.temps1}>*Campos Obligatorios</label>
        </form>
       
       
       
       

       
       
     
       
       
       
       
       
       
      
    
    
    
        
       </div>
      
       
  
  
    
    
    




  )
  
}


export default Form