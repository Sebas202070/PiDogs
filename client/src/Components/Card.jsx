import React from 'react'
import styled from "./Card.module.css"

function Card(props) {

  return (
    <div className={styled.container}>
      <div className={styled.img}>
        <img src={props.img} alt="Not Found" width="250px" height="180px" />
        </div>
        <p>Name: {props.name}</p>
        <p>Weight: {props.weight}</p>
        <p>Temperaments: {props.temperaments}</p>
    </div>
  )
}

export default Card