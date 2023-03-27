import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCopas, fetchJugadores } from '../../Redux/Actions';
import s from './Copas.module.css';

export const CopaDetail = () => {
  let { id } = useParams();
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCopas());
    dispatch(fetchJugadores());
  }, [dispatch]);

  let copasState = useSelector((state) => state.copas);
  let jugadoresState = useSelector((state) => state.jugadores);
  let copa = copasState.find((copa) => copa._id === id) || [];
  let jugadores = jugadoresState.filter((jugador) =>
    jugador.copasJugadas.some((copaJugada) => copaJugada.copa === id)
  );

  console.log(jugadores)

  let celdas = [];
  for (let i = 0; i < copa.cantidadPartidas; i++) {
    celdas.push(`${i + 1}`);
  }

  let jugadoresMap = jugadores.map((jugador) => {
    let jugadoresCopa = {
      ...jugador,
      copasJugadas: jugador.copasJugadas.find((copa) => copa.copa === id),
    };
    return jugadoresCopa;
  });

  let renderJugadores = jugadoresMap.map((jugador) => {
    // En lugar de renderizar cada puntaje en una celda diferente
    // ahora creamos un array con todos los puntajes de un jugador
    let puntajesJugador = jugador.copasJugadas.puntos.slice(1);

    // Renderizamos la suma de los puntajes en la columna "Puntos"
    let total = puntajesJugador.reduce((a, b) => Number(a) + Number(b), 0);
    return (
      <tr>
        <Link to={'/jugadores/' + jugador._id}>
          <td>{jugador.nombre}</td>
        </Link>
        {jugador.copasJugadas.puntos.slice(1).map((puntaje) => {
          return <td>{puntaje}</td>;
        })}
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
            {celdas.map((e) => {
              return <th> {e} </th>;
            })}
            <th>Puntos</th>
          </tr>
        </thead>
        <tbody>{renderJugadores}</tbody>
      </table>
    </div>
  );
};





