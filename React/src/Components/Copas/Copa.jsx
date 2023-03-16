import React,{useEffect} from 'react'
import s from './Copas.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCopas, fetchJugadores } from '../../Redux/Actions';


export const Copa = () => {
    let dispatch = useDispatch();
    useEffect(() => {
      dispatch(fetchCopas())
      dispatch(fetchJugadores)
      ;
    }, []);
    let copasState = useSelector((state) => state.copas);
    let jugadoresState = useSelector((state) => state.jugadores);
    let copa = copasState.find(copa => copa._id === )
  return (
    <div className={s.elemento}>Copa</div>
  )
}
