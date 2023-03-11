import { CREATE_DOGS, FILTER_BY_SOURCE, FILTER_BY_TEMPERAMENTS, GET_ALL_DOGS, GET_ALL_TEMPERAMENTS, GET_DOGS_BY_ID, GET_DOGS_BY_NAME, ORDER_BY_NAME, ORDER_BY_WEIGHT, SHOW_DOG} from "./actions";




const initialState = {
    dogs: [],
    dogsDetail: {},
    temperaments : [],
    allDogs: [],
    showDog:{}

}


const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_DOGS:
            return {...state,
            dogs: action.payload,
            allDogs:action.payload}

            case GET_ALL_TEMPERAMENTS:
                return{...state,
                temperaments: action.payload}
           
                case GET_DOGS_BY_ID:
                    return{...state,
                    dogsDetail: action.payload}

                    case CREATE_DOGS:
                        return{...state}

                        case GET_DOGS_BY_NAME:
                            return{...state,
                            dogs: action.payload}

                            case FILTER_BY_TEMPERAMENTS:
                                if(action.payload){
                                    const filter = state.allDogs.filter(d => (d.temperament && d.temperament.includes(action.payload)) || (d.temperaments && d.temperaments.map(d => d.name).includes(action.payload)))
                                    if(!filter.length) {
                                      alert('No Dogs found for this genre! refreshing...')
                                      return {
                                        ...state,
                                        dogs: state.allDogs
                                      }
                                    }
                                     return {
                                      ...state,
                                      dogs: filter
                                    }
                                  } else {
                                    return {
                                      ...state,
                                      dogs: state.allDogs,
                                    }
                                  
                            
                                }

                                case FILTER_BY_SOURCE:
                                    if(action.payload === "bdd") {
                                const sourceBdd = state.allDogs.filter(d => typeof d.id === "string")
                                return {
                                    ...state,
                                    dogs: sourceBdd
                                }
                                    } else if (action.payload === "api") {
                                        const sourceApi = state.allDogs.filter(d => typeof d.id === "number")
                                        return {
                                            ...state,
                                            dogs: sourceApi
                                        }
                                    } else {
                                        return{
                                        ...state,
                                        dogs: state.dogs,

                                    }
                                }

                                case ORDER_BY_NAME:
                                    if(action.payload === 'A-Z') {
                                        const AZ= state.dogs.sort((a,b) => {return a.name.localeCompare(b.name)})
                                        return {
                                            ...state,
                                            dogs: AZ
                                        }
                                    } else  if(action.payload === 'Z-A') {
                                        const AZ= state.dogs.sort((a,b) => {return b.name.localeCompare(a.name)})
                                        return {
                                            ...state,
                                            dogs: AZ
                                        }
                                    } else{
                                        return {
                                            ...state,
                                            dogs:state.dogs
                                        }
                                    }

                                    case ORDER_BY_WEIGHT:
                                    if(action.payload === '0-200') {
                                      /*   const weight = state.dogs.sort((a,b) => {return a.weight.localeCompare(b.weight)}) */
                                       const weight = state.dogs.sort((a,b) => {return parseInt(a.weight) - parseInt(b.weight)}) ;
                                        return {
                                            ...state,
                                            dogs: weight
                                        }
                                    } else  if(action.payload === '200-0') {
                                      /*   const weight= state.dogs.sort((a,b) => {return b.weight.localeCompare(a.weight)}) */
                                      const weight = state.dogs.sort((a,b) => {return parseInt(b.weight) - parseInt(a.weight)}) ;
                                        return {
                                            ...state,
                                            dogs: weight
                                        }

                                        
                                    } else{
                                        return {
                                            ...state,
                                            dogs:state.dogs
                                        }
                                    }


                                    case SHOW_DOG:
                            return{...state,
                        showDog: action.payload}
    
    
        default:
            return {...state}
            
    }
}


export default rootReducer;