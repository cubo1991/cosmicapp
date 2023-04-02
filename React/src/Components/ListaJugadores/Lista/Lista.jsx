import React from 'react'
import { Link } from 'react-router-dom';

export const Lista = ({ jugadores }) => {

  const jugadorLista = jugadores.map((jugador, index) => {
    return (<tr key={index}>
      <td>{index + 1}</td>
      <Link to={'/jugadores/' + jugador._id}>
        <td>
          <td>{jugador.nombre}</td>
        </td>
      </Link>
      <td>{jugador.puntosPartidas}</td>
    </tr>
    )
  })

  return (
    <table>
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
  );
  

}
