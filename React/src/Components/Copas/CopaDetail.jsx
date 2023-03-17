import React, {useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCopas, fetchJugadores } from '../../Redux/Actions';
import s from './Copas.module.css'
export const CopaDetail = () => {
    let {id} = useParams()
    let dispatch = useDispatch();
    useEffect(() => {
      dispatch(fetchCopas())
      dispatch(fetchJugadores())
      
      ;
    }, [dispatch]);

  

    let copasState = useSelector((state) => state.copas);
    let jugadoresState = useSelector((state) => state.jugadores);
    let copa = copasState.find(copa => copa._id === id ) || []
    let jugadores = jugadoresState.filter(jugador => jugador.copasJugadas.some(copaJugada => copaJugada.copa === id))
    console.log(copa.cantidadPartidas)
   
    let celdas = [];
    for( let i = 0; i < copa.cantidadPartidas; i++){
        celdas.push(`${i+1}`)
    }

   let jugadoresMap = jugadores.map((jugador) => {
    let jugadoresCopa = {...jugador, copasJugadas: jugador.copasJugadas.find(copa => copa.copa === id)}
    return  jugadoresCopa

    
   })
   console.log(jugadoresMap)
   let renderJugadores = jugadoresMap.map((jugador) => {
    let puntajesJugador = [];
    for (let i = 0; i < copa.cantidadPartidas; i++) {
      puntajesJugador.push(jugador.puntosPartidas[i]);
    }
  
    let renderPuntajesJugador = puntajesJugador.map((puntaje) => {
      return <td>{puntaje}</td>;
    });
let numbers= jugador.copasJugadas.puntos
  let total = numbers.reduce((a, b) => Number(a) + Number(b), 0);
  console.log(total)
    return (
      <tr>
        <td>{jugador.nombre}</td>
        {renderPuntajesJugador}
        <td>{total}</td>
      </tr>
    );
  });
   

  return (
    <div className={s.elemento}>
            <table>
  <thead>
    <tr>
      <th>Nombre</th>    

        {celdas.map((e) => {return <th> {e} </th>} )}
     
    
      <th>Puntos</th>
    </tr>
  </thead>
  <tbody>
  {renderJugadores} 
  </tbody>
</table>
           

    </div>
  )
}
