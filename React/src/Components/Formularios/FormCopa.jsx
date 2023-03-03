import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJugadores } from '../../Redux/Actions';
import Select from "react-select";

export const FormCopa = () => {
  const [nombre, setNombre] = useState('');
  const [cantidadPartidas, setCantidadPartidas] = useState('');
  const [jugadores, setJugadores] = useState('');
  const [errors, setErrors] = useState({});
  const [jugadoresSeleccionados, setJugadoresSeleccionados] = useState([]);

  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchJugadores());
  }, [dispatch]);
  let jugadoresState = useSelector((state) => state.jugadores);
  console.log(jugadoresState);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log({ nombre, cantidadPartidas, jugadores });
    setNombre('');
    setCantidadPartidas('');
    setJugadores('');
  };

  const handleNombreChange = (e) => {
    setNombre(e.target.value);
    setErrors((prevState) => ({ ...prevState, nombre: null }));
  };

  const handleCantidadPartidasChange = (e) => {
    setCantidadPartidas(e.target.value);
    setErrors((prevState) => ({ ...prevState, cantidadPartidas: null }));
  };

  const handleJugadoresChange = (e) => {
    const options = e.target.options;
    const selectedIds = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedIds.push(options[i].value);
      }
    }
    setJugadoresSeleccionados(selectedIds);
    setJugadores(selectedIds); // actualizar el estado de jugadores también
    setErrors((prevState) => ({ ...prevState, jugadores: null }));
  };
    

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (value.trim() === '') {
      setErrors((prevState) => ({
        ...prevState,
        [name]: 'Este campo es requerido',
      }));
    }
  };

  return (
    <form onSubmit={onSubmit}>
    
      <div className="form-group">
        <label htmlFor="nombre">Nombre</label>
        <input
          type="text"
          className="form-control"
          id="nombre"
          name="nombre"
          value={nombre}
          onChange={handleNombreChange}
          onBlur={handleBlur}
        />
        {errors.nombre && (
          <span className="text-danger">{errors.nombre}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="cantidadPartidas">Cantidad de partidas</label>
        <input
          type="number"
          className="form-control"
          id="cantidadPartidas"
          name="cantidadPartidas"
          value={cantidadPartidas}
          onChange={handleCantidadPartidasChange}
          onBlur={handleBlur}
        />
        {errors.cantidadPartidas && (
          <span className="text-danger">{errors.cantidadPartidas}</span>
        )}
      </div>

      <div className="form-group">
      <label htmlFor="jugadores">Jugadores</label>
     <Select
  options={jugadoresState.map((jugador) => ({ value: jugador._id, label: jugador.nombre }))}
  isMulti
  name="jugadores"
  value={jugadoresSeleccionados.map((jugadorId) => ({ value: jugadorId, label: jugadoresState.find((jugador) => jugador._id === jugadorId).nombre }))}
  onChange={(options) => {
    const selectedIds = options.map((option) => option.value);
    setJugadoresSeleccionados(selectedIds);
    setJugadores(selectedIds);
    setErrors((prevState) => ({ ...prevState, jugadores: null }));
  }}
/>
      {jugadores.length > 0 && (
        <div>
          Jugadores seleccionados:{" "}
          {jugadores.map((jugador) => jugador.label).join(", ")}
        </div>
      )}
    </div>

  <button type="submit" className="btn btn-primary">
    Guardar
  </button>
</form>

  );
};