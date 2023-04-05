import { DELETE_JUGADORES, FETCH_ALIENS, FETCH_COPAS, FETCH_JUGADORES, FETCH_RANKING, PUT_JUGADORES, PUT_RANKING } from "../Constantes/constantes";



const initialState = {

      jugadores: [],
      rankingJugadores: [],
      copas: [],
      copaFinalizada: [],
      aliens: []
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
            case PUT_JUGADORES:
                return{
                    ...state,
                }
            case PUT_RANKING:
                return{
                    ...state,
                    copaFinalizada: action.payload
                }
              case FETCH_ALIENS:
                return{
                    ...state,
                    aliens: action.payload

                }  
       
        
   

    default:return state;
}

}

