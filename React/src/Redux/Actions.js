import axios from 'axios';
import { DELETE_JUGADORES, FETCH_JUGADORES, FETCH_RANKING, POST_JUGADOR } from '../Constantes/constantes';


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

  
  export const postJugador = (data) => {
    return async function (dispatch){
    
      try {
       await axios.post('/jugador', data);
        dispatch({
          type:POST_JUGADOR,
          
        });
      } catch (error) {
        dispatch({
        type:POST_JUGADOR,
        error: [error]});
        console.log(error)
      }
    }
  }
  export const deleteJugadores = () =>{
    return async function (dispatch){
    
      try {
       await axios.delete('/jugadores', );
        dispatch({
          type:DELETE_JUGADORES,
          
        });
      } catch (error) {
        dispatch({
        type:DELETE_JUGADORES,
        error: [error]});
        console.log(error)
      }
    }
  }