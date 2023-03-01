import axios from "axios"

export const  GET_ALL_DOGS = "GET_ALL_DOGS"



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
