import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from "./Card.module.css"

function Card(props) {
/* console.log("i", props.id) */
  return (
    <div className={styled.container}>
      <div className={styled.img}>
        <NavLink to={`/detail/${props.id}`}>
        <img  src={props.img} alt="Not Found" width="250px" height="180px" />
        </NavLink>
        </div>
        <p className={styled.p}>Nombre: {props.name}</p>
        <p className={styled.p}>Peso: {props.weight}</p>
        <p className={styled.p}>Temperamentos: {props.temperaments}</p>
     {/*    <p>Height: {props.height}</p>
        <p>Life Span: {props.life_span}</p> */}
    </div>
  )
}

export default Card