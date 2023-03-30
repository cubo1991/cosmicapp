import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { JugadorDetail } from './JugadorDetail'
import { fetchJugadores, fetchCopas } from '../../Redux/Actions';

export const Jugador = () => {
    const {id} = useParams()
    let dispatch = useDispatch()
    useEffect(() => {
      dispatch(fetchJugadores())
      dispatch(fetchCopas())
      
  }, []);
   
    let jugadoresState = useSelector((state) => state.jugadores); 
    let found = jugadoresState.find(e => e._id === id);
    

  return (
    <JugadorDetail jugador={found}/>
  )
}
