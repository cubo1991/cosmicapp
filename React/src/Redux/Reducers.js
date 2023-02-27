import { FETCH_JUGADORES, FETCH_RANKING } from "../Constantes/constantes";



const initialState = {

      jugadores: [],
      rankingJugadores: [],
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
        
   

    default:return state;
}

}

