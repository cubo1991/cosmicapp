import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchJugadores, fetchCopas, putJugadores } from '../../Redux/Actions';
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
    copaId: '',
    jugadoresId: ''
  });
  const addAllPlayers = () => {
    let idJugadores = jugadoresState.map((e) => e._id);
    setCopaData((copa) => ({ ...copa, jugadoresId: idJugadores }));
  }

  let optionsCopa = copasState.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((e => {
    return {
      value: e._id,
      label: e.nombre
    } 
  }) );

let optionsJugador = jugadoresState.map((e => {
  return {
    value: e._id,
    label: e.nombre
  } 

}) )
const onSubmit = (e) => {
  e.preventDefault();
  dispatch(putJugadores(copaData))
    .then(() => dispatch(fetchCopas()))
    .then(() => dispatch(fetchJugadores()))
    .then(() => resetForm());
};

const resetForm = () => {
  setCopaData({
    copaId: "",
    jugadoresId: ""
  });
};


return (
  <div className="container mt-5">
    <form>
      <div className="form-group">
        <label htmlFor="idCopa">Nombre de la copa:</label>
        <Select
          id="idCopa"
          options={optionsCopa}
          value={optionsCopa.find((option) => option.value === copaData.copaId)}
          onChange={(options) => {
            setCopaData((copa) => ({ ...copa, copaId: options.value }));
          }}
        />
      </div>
      <div className="form-group">
        <label htmlFor="idJugador">Nombre del jugador:</label>
        <Select
          id="idJugador"
          isMulti
          options={optionsJugador}
          value={optionsJugador.filter((option) =>
            copaData.jugadoresId.includes(option.value)
          )}
          onChange={(options) => {
            let idJugadores = options.map((e) => e.value);
            setCopaData((copa) => ({ ...copa, jugadoresId: idJugadores }));
          }}
        />
            <button type="button" onClick={addAllPlayers} className="btn btn-secondary">
          Agregar todos los jugadores
        </button>
      </div>
      <button type="submit" onClick={onSubmit} className="btn btn-primary">
        Enviar
      </button>
    </form>
  </div>
);
}
