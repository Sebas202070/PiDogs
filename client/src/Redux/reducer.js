import {
  CREATE_DOGS,
  FILTER_BY_SOURCE,
  FILTER_BY_TEMPERAMENTS,
  FILTER_FOR_CHILDREN,
  GET_ALL_DOGS,
  GET_ALL_TEMPERAMENTS,
  GET_DOGS_BY_ID,
  GET_DOGS_BY_NAME,
  ORDER_BY_NAME,
  ORDER_BY_WEIGHT,

} from "./actions";

const initialState = {
  dogs: [],
  dogsDetail: {},
  temperaments: [],
  allDogs: [],
  showDog: {},
  filtrado:[]
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_DOGS:
      return { ...state, dogs: action.payload, allDogs: action.payload, filtrado:action.payload };

    case GET_ALL_TEMPERAMENTS:
      return { ...state, temperaments: action.payload };

    case GET_DOGS_BY_ID:
      return { ...state, dogsDetail: action.payload };

    case CREATE_DOGS:
      return { ...state };

    case GET_DOGS_BY_NAME:
      return { ...state, filtrado: action.payload };

    case FILTER_BY_TEMPERAMENTS:
      if (action.payload) {
        const filter = state.dogs.filter(
          (d) =>
            (d.temperament && d.temperament.includes(action.payload)) ||
            (d.temperaments &&
              d.temperaments.map((d) => d.name).includes(action.payload))
        );
        if (!filter.length) {
          alert("No Dogs found for this genre! refreshing...");
          return {
            ...state,
            filtrado: state.filtrado,
          };
        }
        return {
          ...state,
          filtrado: filter,
        };
      } else {
        return {
          ...state,
          filtrado: state.allDogs,
        };
      }

    case FILTER_BY_SOURCE:
      if (action.payload === "bdd") {
        const sourceBdd = state.dogs.filter((d) => typeof d.id === "string");
        return {
          ...state,
          filtrado: sourceBdd,
        };
      } else if (action.payload === "api") {
        const sourceApi = state.dogs.filter((d) => typeof d.id === "number");
        return {
          ...state,
          filtrado: sourceApi,
        };
      } else {
        return {
          ...state,
          filtrado: state.dogs,
        };
      }

    case ORDER_BY_NAME:
      if (action.payload === "A-Z") {
        const AZ = state.filtrado.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
        return {
          ...state,
          filtrado: AZ,
        };
      } else if (action.payload === "Z-A") {
        const AZ = state.filtrado.sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
        return {
          ...state,
          filtrado: AZ,
        };
      } else {
        return {
          ...state,
        filtrado: state.dogs,
        };
      }

    case ORDER_BY_WEIGHT:
        
      if (action.payload === "0-200") {
        /*   const weight = state.dogs.sort((a,b) => {return a.weight.localeCompare(b.weight)}) */
       /*  const perronan = state.filtrado.filter(e => isNaN(e.weight)) */
       /*  const weight = state.filtrado.filter(e => isNaN(e.weight)).sort((a, b) => { */
       /*   return parseInt(a.weight) - parseInt(b.weight); */
       const weight = state.filtrado.sort((a, b) => { 
       return parseInt(a.weight) - parseInt(b.weight); 
        });
        return {
          ...state,
          filtrado: weight
        };
      } if (action.payload === "200-0") {
        /*   const weight= state.dogs.sort((a,b) => {return b.weight.localeCompare(a.weight)}) */
       /*  const perronan = state.filtrado.filter(e => isNaN(e.weight)) */
       /*  const weight1 = state.filtrado.filter(e => isNaN(e.weight)).sort((a, b) => { */
       /*    return parseInt(b.weight) - parseInt(a.weight); */
       const weight1 = state.filtrado.sort((a, b) => { 
       return parseInt(b.weight) - parseInt(a.weight); 
        });
        return {
          ...state,
          filtrado: weight1
        };
      } else {
        return {
          ...state,
         filtrado: state.dogs,
        };
      }

 
 

    case FILTER_FOR_CHILDREN:
      if (action.payload === "Mascotas para niños") {
        const child = state.dogs.filter(e =>/*  e.temperaments?.map(e=> e.name === "Curious") || */ e.temperament?.includes("Curious")) ;
      
        return {
          ...state,
          filtrado: child,
         
        
        };
       
      } if (action.payload === "Mascotas para adultos y ancianos") {
        const child1 = state.dogs.filter(e => /* e.temperaments?.map(e=> e.name === "Stubborn") ||  */e.temperament?.includes("Active")) ;
       
        return {
          ...state,
          filtrado: child1,

        }
    }
       else {
        return {
            ...state,
            filtrado:state.dogs
        }
      }

    default:
      return { ...state };
  }
};

export default rootReducer;
