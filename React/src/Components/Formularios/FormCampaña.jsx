import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJugadores, fetchCopas } from '../../Redux/Actions';

export const FormCampaña = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchJugadores());
    dispatch(fetchCopas());
  }, [dispatch]);

  const jugadoresState = useSelector((state) => state.jugadores);

  const [jugadoresSeleccionados, setJugadoresSeleccionados] = useState(
    jugadoresState.reduce((acc, jugador) => ({ ...acc, [jugador.id]: false }), {})
  );

  const handleCheckboxChange = (jugadorId) => {
    setJugadoresSeleccionados((prevState) => ({
      ...prevState,
      [jugadorId]: !prevState[jugadorId],
    }));
  };
  return (
    <div className="container mt-5">
      <form>
        {jugadoresState.map((jugador) => (
          <div key={jugador.id} className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id={jugador.id}
              name={jugador.id}
              checked={jugadoresSeleccionados[jugador.id] || false}
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor={jugador.id}>
              {jugador.nombre}
            </label>
          </div>
        ))}
      </form>
    </div>
  );
};
