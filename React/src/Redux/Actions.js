import axios from 'axios';
import { CREATE_COPA, DELETE_JUGADORES, FETCH_COPAS, FETCH_JUGADORES, FETCH_RANKING, POST_JUGADOR, PUT_JUGADORES, PUT_PUNTOSJUGADORES } from '../Constantes/constantes';


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

  export const createCopa =(data) => {
    return async function (dispatch) {
      try {
        await axios.post('/copa', data);
         dispatch({
           type:CREATE_COPA,
           
         });
       } catch (error) {
         dispatch({
         type:CREATE_COPA,
         error: [error]});
         console.log(error)
       }
    }
  }
  export const fetchCopas = () => {
    return async function (dispatch) {
      try {
        const copas = await axios.get('/copa');
        dispatch({
          type: FETCH_COPAS,
          payload: copas.data
        });
      } catch (error) {
        dispatch({
          type: FETCH_COPAS,
          error: [error]
        });
        console.log(error);
      }
    };
  };

  export const putJugadores = (data) =>{
   
    return async function (dispatch){
      try{
        await axios.put('/copa/id/agregarJugador', data);
        dispatch({
          type: PUT_JUGADORES,
          
        }) 
      } catch (error){
        dispatch({
          type: PUT_JUGADORES,
          error:[error]
        })
      }
    }
  }

  export const putPuntosJugadores = (data) =>{

   
    let datos = {'idCopa': data[0], 'jugadores': data[1]}
  
    return async function(dispatch){
try{
  await axios.put('/puntuacionJugador',datos );
  dispatch({
    type: PUT_PUNTOSJUGADORES
  })

}catch(error){
  dispatch({
    type:PUT_PUNTOSJUGADORES,
    error:[error]
  })

}}

  }