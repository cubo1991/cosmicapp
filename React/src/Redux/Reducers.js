import { CREATE_COPA, DELETE_JUGADORES, FETCH_COPAS, FETCH_JUGADORES, FETCH_RANKING } from "../Constantes/constantes";



const initialState = {

      jugadores: [],
      rankingJugadores: [],
      copas: []
}

export default function reducer(state = initialState, action) {
switch (action.type) {
    case FETCH_JUGADORES:
       
        return{
            ...state,
            jugadores: action.payload
        }
        case FETCH_RANKING:
        return{
            ...state,
            rankingJugadores: action.payload

        }
        case DELETE_JUGADORES:
            return{
                ...state,
                jugadores: []
            }
            case FETCH_COPAS:
       
            return{
                ...state,
                copas: action.payload
            }
       
        
   

    default:return state;
}

}

