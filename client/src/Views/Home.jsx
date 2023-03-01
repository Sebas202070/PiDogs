import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card from '../Components/Card'
import { getAllDogs } from '../Redux/actions'
import styled from "./Home.module.css"

function Home() {

const dogs = useSelector(state => state.dogs)
/* console.log(dogs) */
const dispatch = useDispatch()

useEffect (()=> {
dispatch(getAllDogs())
},[dispatch])

  return (
 
    <div className={styled.con}>
      {dogs?.length > 0 && dogs?.map(d => {
           
           return <Card
        key={crypto.randomUUID()}
        img={d.image}
        name={d.name}
       weight={d.weight}
       temperaments={d.temperament}
       
        />
     
    } )}
    
    </div>
  
  )
}

export default Home