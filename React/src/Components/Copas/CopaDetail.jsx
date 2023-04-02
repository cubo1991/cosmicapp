
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCopas, fetchJugadores, putRanking, finCopa } from '../../Redux/Actions';
import s from './Copas.module.css';
import { useNavigate } from 'react-router-dom';

export const CopaDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const copasState = useSelector((state) => state.copas);
  const jugadoresState = useSelector((state) => state.jugadores);
  const copa = copasState.find((copa) => copa._id === id) || {};
  const jugadores = jugadoresState.filter((jugador) =>
    jugador.copasJugadas.some((copaJugada) => copaJugada.copa === id)
  );


  useEffect(() => {
    dispatch(fetchCopas());
    dispatch(fetchJugadores());
  }, [dispatch]);

  const celdas = new Array(copa.cantidadPartidas).fill().map((_, i) => i + 1);

  const jugadoresMap = jugadores.map((jugador) => {
    const copaJugada = jugador.copasJugadas.find((copa) => copa.copa === id);
    return { ...jugador, copasJugadas: copaJugada };
  });

  const renderPuntajes = jugadoresMap.map((jugador) => {
    const puntajesJugador = jugador.copasJugadas.puntos;
    const total = puntajesJugador.reduce((a, b) => Number(a) + Number(b), 0);
    return (
      <tr>
        <td>{total}</td>
      </tr>
    );
  });

  const renderJugadores = jugadoresMap.map((jugador) => {
    const copaJugada = jugador.copasJugadas;

    const renderPuntajesJugador = copaJugada.puntos.map((puntaje) => <td>{puntaje}</td>);
    return (
      <tr>
        <td>
          <Link to={`/jugadores/${jugador._id}`}>{jugador.nombre}</Link>
        </td>
        {renderPuntajesJugador}
      </tr>
    );
  });



  const ordenarJugadores = () => {
    const jugadoresOrdenados = [...jugadoresMap].sort((a, b) => b.copasJugadas.puntos.reduce((x, y) => x + y) - a.copasJugadas.puntos.reduce((x, y) => x + y));
    
    dispatch(finCopa({ id: id, ganador: ranking[0].nombre }));
    dispatch(putRanking(jugadoresOrdenados));
    navigate('/');
  };

  let rankingJugadores = jugadoresMap.map((jugador) => {
    let puntajesJugador = [];
    let numbers = jugador.copasJugadas.puntos;
  
    for (let i = 1; i < copa.cantidadPartidas; i++) {
      puntajesJugador.push(jugador.puntosPartidas[i]);
    }
  
    let total = numbers.reduce((a, b) => Number(a) + Number(b), 0);
    jugador.total = total;
  
    return jugador;
  });
  
  let ranking = rankingJugadores.sort((a, b) => b.total - a.total);
  
  return (
    <div className={s.elemento}>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
  
            {celdas.map((e) => {
              return <th> {e} </th>;
            })}
          </tr>
        </thead>
        <tbody>{renderJugadores}</tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th>Puntos</th>
          </tr>
        </thead>
        <tbody>{renderPuntajes}</tbody>
      </table>
      {copa.finalizada === false && copa.partidasJugadas === copa.cantidadPartidas ? (
        <button onClick={ordenarJugadores}>Finalizar Copa</button>
      ) : copa.finalizada === true ? (
        <div>
          <p>El campeón de esta copa es {ranking[0].nombre} </p>
          <Link to={'/jugadores/' + ranking[0]._id}>Perfil del ganador</Link>
        </div>
      ) : (
        <p>Faltan partidas por jugarse</p>
      )}
    </div>
  );
      }  


