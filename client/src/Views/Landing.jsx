import React from 'react'
import { Link } from 'react-router-dom'
import Home from './Home'
import styled from "./Landing.module.css"

function Landing() {
  return (
    <div className={styled.back}>
        <h1 className={styled.titles}>Bienvenidos a Dogs Pi!!</h1>
        <Link to="/home">
        <button className={styled.button}>Haz click aqui!!</button>
        </Link>
    </div>
  )
}

export default Landing