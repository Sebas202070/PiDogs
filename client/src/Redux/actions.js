import axios from "axios"

export const  GET_ALL_DOGS = "GET_ALL_DOGS"
export const GET_ALL_TEMPERAMENTS = "GET_ALL_TEMPERAMENTS"
export const GET_DOGS_BY_ID = "GET_DOGS_BY_ID"
export const CREATE_DOGS = "CREATE_DOGS"
export const GET_DOGS_BY_NAME = "GET_DOGS_BY_NAME"
export const FILTER_BY_TEMPERAMENTS = "FILTER_BY_TEMPERAMENTS"
export const FILTER_BY_SOURCE = "FILTER_BY_SOURCE"
export const ORDER_BY_NAME = "ORDER_BY_NAME"
export const ORDER_BY_WEIGHT = "ORDER_BY_WEIGHT"
export const SHOW_DOG = "SHOW_DOG"

export const getAllDogs = () => {
    return async function(dispatch) {
    const apidata = await axios.get("http://localhost:3001/dogs")
    const {result} = apidata.data
    dispatch({
        type:GET_ALL_DOGS,
        payload:result,
    })

    }
}

export const getAllTemperaments = () => {
    return async function(dispatch) {
        const api = await axios.get("http://localhost:3001/temperaments")
        const dogs = api.data
        dispatch({
            type: GET_ALL_TEMPERAMENTS,
            payload:dogs,
        })
    }
}


export const getDogsbyId = (id) => {
    return async function(dispatch) {
        const apid = await axios.get(`http://localhost:3001/dogs/${id}`)
        const dogsid = apid.data
        dispatch({
            type: GET_DOGS_BY_ID,
            payload:dogsid
        })
    }
}


export function getDogsByName (name) {
	return async function (dispatch) { 
		const apiname = await axios.get(`http://localhost:3001/dogs?name=${name}`).catch(error => alert(error.message))
		const {result} = apiname.data
		dispatch({type: GET_DOGS_BY_NAME,
             payload: result})
	}
}


export const createDogs = (dog) => {
    return async function(dispatch) {
       const apic = await axios.post("http://localhost:3001/dogs", dog )
       const dogc = apic.data
       if(dogc) {alert("Mascota creada exitosamente!!")}
       dispatch({
        type: CREATE_DOGS,
        payload: dogc
       })
    }
}

export const filterByTemperaments = (payload) => {
    return {
        type: FILTER_BY_TEMPERAMENTS,
        payload
    }

}

export const filterBySource = (payload) => {
    return {
        type: FILTER_BY_SOURCE,
        payload
    }
}

export const orderByName = (payload) => {
    return {
       type: ORDER_BY_NAME,
       payload
    }
}

export const orderByWeight = (payload) => {
    return {
       type: ORDER_BY_WEIGHT,
       payload
    }
}

export const showDog = (dog) => {
    return async function(dispatch) {
        const apic = await axios.get("http://localhost:3001/dogs", dog )
        const dogc = apic.data
       
        dispatch({
         type: SHOW_DOG,
         payload: dogc
        })
     }
 }

