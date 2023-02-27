import React from 'react'

export const Lista = ({jugadores}) => {
    console.log(jugadores)
    const jugadorLista = jugadores.map((jugador, index) => { 
        return (<tr key={index}>
            <td>{index+1}</td>
        <td>{jugador.nombre}</td>
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
          <tbody>{jugadorLista}</tbody>
        </table>
      );
  
}
