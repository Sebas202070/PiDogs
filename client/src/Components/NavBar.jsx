import React from 'react'
import { Link } from 'react-router-dom'
import style from "./NavBar.module.css"

const NavBar = () => {
  return (
    <div className={style.container}>
   <Link className={style.link} to="/home">Home</Link>
   <Link className={style.link}to="/create">Crear Mascota</Link>
    </div>
  )
}

export default NavBar