import axios from 'axios';
import { FETCH_JUGADORES, FETCH_RANKING } from '../Constantes/constantes';


export const fetchJugadores = () => {
    return async function (dispatch) {
      try {
        const jugadores = await axios.get('/jugadores');
        dispatch({
          type: FETCH_JUGADORES,
          payload: jugadores.data
        });
      } catch (error) {
        dispatch({
          type: FETCH_JUGADORES,
          error: [error]
        });
        console.log(error);
      }
    };
  };

  export const fetchRanking = () => {
    return async function (dispatch){
      try {
        const ranking = await axios.get('/ranking');
        dispatch({
          type:FETCH_RANKING,
          payload: ranking.data
        });
      } catch (error) {
        dispatch({
        type:FETCH_RANKING,
        error: [error]});
        console.log(error)
      }
    }
  }