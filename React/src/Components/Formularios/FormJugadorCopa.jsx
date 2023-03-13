import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchJugadores, fetchCopas } from '../../Redux/Actions';
import Select from "react-select";

export const FormJugadorCopa = () => {
    let dispatch = useDispatch();
    useEffect(() => {
      dispatch(fetchJugadores());
      dispatch(fetchCopas())
    }, [dispatch]);
    let jugadoresState = useSelector((state) => state.jugadores);
    let copasState = useSelector((state) => state.copas);
const [copaData, setCopaData] = useState({
    idCopa: '',
    idJugador: ''
  });
console.log(copasState)
  return (
    <div className="container mt-5">
      <form>
        <div className="form-group">
          <label htmlFor="idCopa">ID de la copa:</label>
          <Select
            id="idCopa"
            options={copasState}
            value={copasState.find(copa => copa.value === copaData.idCopa)}
            onChange={(selectedOption) => setCopaData({...copaData, idCopa: selectedOption.value})}
          />
        </div>
        <div className="form-group">
          <label htmlFor="idJugador">ID del jugador:</label>
          <Select
            id="idJugador"
            options={jugadoresState}
            value={jugadoresState.find(jugador => jugador.value === copaData.idJugador)}
            onChange={(selectedOption) => setCopaData({...copaData, idJugador: selectedOption.value})}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Enviar
        </button>
      </form>
    </div>
  );
}
