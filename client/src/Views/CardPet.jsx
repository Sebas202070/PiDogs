
import { getDogsByName } from '../Redux/actions'
import {useDispatch, useSelector} from "react-redux"
import { useEffect, useState } from 'react'

function CardPet(props) {
const  dogs = useSelector(state => state.dogs)
console.log(
  'dog', dogs)

    const dispacht = useDispatch()
    useEffect(() => {
     dispacht(getDogsByName(props.name))
    
     
    
    }, [props.name])
    
  return (
    <div>
      <p>{dogs?.name}</p>
    </div>
  )
}

export default CardPet