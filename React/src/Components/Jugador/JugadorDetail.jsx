import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchJugadores, fetchCopas } from '../../Redux/Actions';
import s from './JugadorDetail.module.css';

export const JugadorDetail = () => {
  let dispatch = useDispatch();
  let { id } = useParams();
  let jugadoresState = useSelector((state) => state.jugadores);
  let jugador = jugadoresState.filter((jugador) => jugador._id === id);

  useEffect(() => {
    dispatch(fetchJugadores());
    dispatch(fetchCopas());
  }, [dispatch]);

  console.log(jugador[0]);
  return (
    <div className={s.contenedor}>
      {jugador.length > 0 ? (
        <div className="table-responsive">
          <h2>{jugador[0].nombre}</h2>
          <div className={s.scrollableTable}>
            <table className={s.table}>
              <thead>
                <tr>
                  <th>Categoría</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Jugadas</td>
                  <td>{jugador[0].partidas}</td>
                </tr>
                <tr>
                  <td>Victorias</td>
                  <td>{jugador[0].victorias}</td>
                </tr>
                <tr>
                  <td>Colonias</td>
                  <td>{jugador[0].colonias}</td>
                </tr>
                <tr>
                  <td>Prom. Colonias</td>
                  <td>{jugador[0].colonias / jugador[0].partidas || 0}</td>
                </tr>
                <tr>
                  <td>Victorias especiales</td>
                  <td>{jugador[0].victoriasEspeciales}</td>
                </tr>
                <tr>
                  <td>Campañas ganadas</td>
                  <td>{jugador[0].campañas}</td>
                </tr>
                <tr>
                  <td>Copas ganadas</td>
                  <td>{jugador[0].copas}</td>
                </tr>
                <tr>
                  <td>Ataque solitario</td>
                  <td>{jugador[0].ataqueSolitario}</td>
                </tr>
                <tr>
                  <td>Defensa solitaria</td>
                  <td>{jugador[0].defensaSolitaria}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};
