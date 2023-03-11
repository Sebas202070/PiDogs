import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getDogsbyId } from '../Redux/actions'
import styled from "./Detail.module.css"

function Detail() {
const {id} = useParams()
const dispatch = useDispatch()

const dogDetail = useSelector(state => state.dogsDetail)
console.log("etail", dogDetail)
useEffect(() => {
    dispatch(getDogsbyId(id))
   /*  console.log("id", id) */
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [])
/* console.log("d", dogDetail) */

  return (
    <div className={styled.backimg}>
      <img className={styled.img}src={dogDetail?.result?.image} alt="Not found!!" width="380px" height="380px"/>
    <div className={styled.detail}>
        <p className={styled.p}>Nombre: {dogDetail?.result?.name}</p>
        <p className={styled.p1}>Id: {dogDetail?.result?.id}</p>
        <p className={styled.p1}>Peso: {dogDetail?.result?.weight || dogDetail?.result?.weight?.map(e => e.name)} Kgs</p>
        <p className={styled.p1}>Altura: {dogDetail?.result?.height} Cms</p>
        <p className={styled.p1}>Tiempo de vida: {dogDetail?.result?.life_span} Años</p>
        <p className={styled.p1}>Temperamentos: {dogDetail?.result?.temperament || dogDetail?.result?.temperaments?.map(e=> e.name + ",")}</p>
        </div>
    </div>
    
  )
}

export default Detail