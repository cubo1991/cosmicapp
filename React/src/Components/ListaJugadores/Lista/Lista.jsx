import React from 'react';
import { Link } from 'react-router-dom';
import s from './Lista.module.css';

export const Lista = ({ jugadores }) => {
  return (
    <div className={s.tableContainer}>
      <table className={s.table}>
        <thead>
          <tr>
            <th>Posición</th>
            <th>Nombre</th>
            <th>Puntos</th>
          </tr>
        </thead>
        <tbody>
          {jugadores.map((jugador, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <Link to={`/jugadores/${jugador._id}`}>{jugador.nombre}</Link>
              </td>
              <td>{jugador.puntosPartidas}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
