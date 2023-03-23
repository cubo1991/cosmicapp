import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchJugadores, fetchCopas, putJugadores } from '../../Redux/Actions';
import s from './JugadorDetail.module.css'


export const JugadorDetail = () => {
  let dispatch = useDispatch();
  let {id} = useParams();
  let jugadoresState = useSelector((state) => state.jugadores);
  let jugador = jugadoresState.filter(jugador => jugador._id === id)

  useEffect(() => {
    dispatch(fetchJugadores());
    dispatch(fetchCopas());
  }, [dispatch]);

console.log(jugador[0])
  return (
    <div className={s.contenedor}>
      {jugador.length > 0 ? (
       <div>
           <h2>{jugador[0].nombre}</h2>
        <table>
        <tr>
    <th>Jugadas</th>
    <th>Victorias</th>
    <th>Colonias</th>
    <th>Prom. Colonias</th>
    <th>Victorias especiales</th>
    <th>Campañas ganadas</th>
    <th>Copas ganadas</th>
    <th>Ataque solitario</th>
    <th>Defensa solitaria</th>
  </tr>
  <tr>
    <td>{jugador[0].partidas}</td>
    <td>{jugador[0].victorias}</td>
    <td>{jugador[0].colonias}</td>
    <td>{jugador[0].colonias/jugador[0].partidas}</td>
    <td>{jugador[0].victoriasEspeciales}</td>
    <td>{jugador[0].campañas}</td>
    <td>{jugador[0].copas}</td>
    <td>{jugador[0].ataqueSolitario}</td>
    <td>{jugador[0].defensaSolitaria}</td>
    
    
  </tr>
  <tr>
    
  </tr>


        </table>

       </div>
        
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  )
}




