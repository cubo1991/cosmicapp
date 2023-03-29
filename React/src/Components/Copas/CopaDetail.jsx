
import React, {useEffect,useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCopas, fetchJugadores, putRanking, finCopa } from '../../Redux/Actions';
import s from './Copas.module.css'
import { useNavigate  } from "react-router-dom";


export const CopaDetail = () => {
    let {id} = useParams()
   
    let dispatch = useDispatch();
    let navigate = useNavigate()
    useEffect(() => {
      dispatch(fetchCopas())
      dispatch(fetchJugadores())
      
      ;
    }, [dispatch]);

  
    const [ordenados,setOrdenados] = useState([])
    const [ganador,setGanador] =useState(null)
    let copasState = useSelector((state) => state.copas);
    let jugadoresState = useSelector((state) => state.jugadores);
    let copa = copasState.find(copa => copa._id === id ) || []
    let jugadores = jugadoresState.filter(jugador => jugador.copasJugadas.some(copaJugada => copaJugada.copa === id))

   
    let celdas = [];
    for( let i = 0; i < copa.cantidadPartidas; i++){
        celdas.push(`${i+1}`)
    }

   let jugadoresMap = jugadores.map((jugador) => {
    let jugadoresCopa = {...jugador, copasJugadas: jugador.copasJugadas.find(copa => copa.copa === id)}
    return  jugadoresCopa

    
   })

   let renderJugadores = jugadoresMap.map((jugador) => {
    let puntajesJugador = [];
 
 
    for (let i = 1; i < copa.cantidadPartidas; i++) {
      puntajesJugador.push(jugador.puntosPartidas[i]);
    }
  
    let renderPuntajesJugador = jugador.copasJugadas.puntos.map((puntaje) => {
      return <td>{puntaje}</td>;
    });



    return (
      <tr>
      <Link to={'/jugadores/' + jugador._id}>  <td>{jugador.nombre}</td> </Link>
        {renderPuntajesJugador}
       
      </tr>
    );
  });
  let renderPuntajes = jugadoresMap.map((jugador) => {
    let puntajesJugador = [];
    let numbers= jugador.copasJugadas.puntos
 
    for (let i = 1; i < copa.cantidadPartidas; i++) {
      puntajesJugador.push(jugador.puntosPartidas[i]);
    }
  
  

  let total = numbers.reduce((a, b) => Number(a) + Number(b), 0);

    return (
      <tr>
     
        <td>{total}</td>
      </tr>
    );
  });
  useEffect(() => {
    if (ordenados.length) {
      dispatch(putRanking(ordenados));
    }
  }, [ordenados, dispatch]);

  let ordenarJugadores = () => {
    let jugadoresOrdenados = renderJugadores.sort((a, b) => {
      if (a[0] < b[0]) {
        return 1; // a es menor que b
      } else if (a[0] > b[0]) {
        return -1; // a es mayor que b
      } else {
        return 0; // a y b son iguales
      }
    })
    
    setOrdenados(jugadoresOrdenados)
   
    dispatch(finCopa({"id":id,"ganador":ranking[0].nombre} ))
    navigate("/")
    
  }
  
let rankingJugadores = jugadoresMap.map((jugador) => {
  let puntajesJugador = [];
  let numbers= jugador.copasJugadas.puntos

  for (let i = 1; i < copa.cantidadPartidas; i++) {
    puntajesJugador.push(jugador.puntosPartidas[i]);
  }


  for (let i = 1; i < copa.cantidadPartidas; i++) {
    puntajesJugador.push(jugador.puntosPartidas[i]);
  }



let total = numbers.reduce((a, b) => Number(a) + Number(b), 0);
jugador.total = total

return jugador


  
});

let ranking = rankingJugadores.sort((a, b) => b.total - a.total);


  return (
    <div className={s.elemento}>
            <table>
  <thead>
    <tr>
      <th>Nombre</th>    

        {celdas.map((e) => {return <th> {e} </th>} )}
     
    
    
    </tr>
  </thead>
  <tbody>
  {renderJugadores} 
  </tbody>
</table>
<table>
  <thead>
    <tr>
         
      <th>Puntos</th>
    </tr>
  </thead>
  <tbody>
 {renderPuntajes}
  </tbody>
</table>
{
copa.finalizada === false && copa.partidasJugadas === copa.cantidadPartidas


?
<button onClick={ordenarJugadores}>Finalizar Copa</button>
:
copa.finalizada === true
?
<div>
  <p>El campeón de esta copa es {ranking[0].nombre}</p>
</div>
:
null
}

    </div>
  )
}
