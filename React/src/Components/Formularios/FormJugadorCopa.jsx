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


const optionsCopa = copasState.map((e => {
  return {
    value: e._id,
    label: e.nombre
  } 

}) )

const optionsJugador = jugadoresState.map((e => {
  return {
    value: e._id,
    label: e.nombre
  } 

}) )
const onSubmit = (e) => {
 e.preventDefault()
  dispatch(putJugadores(copaData))
}


  return (
    <div className="container mt-5">
      <form>
        <div className="form-group">
          <label htmlFor="idCopa">ID de la copa:</label>
          <Select
          id="idCopa"
          options={optionsCopa}
          onChange={(options)=> {           
            setCopaData((copa) => ({...copa,copaId: options.value}))
          }}  
          />
        </div>
        <div className="form-group">
          <label htmlFor="idJugador">ID del jugador:</label>
          <Select
            id="idJugador"
            isMulti
            options={optionsJugador}   
            onChange={(options)=> {
              let idJugadores = options.map((e) => e.value)
              
              setCopaData((copa) => ({...copa,jugadoresId: idJugadores}))
            }}        
          />
        </div>
        <button type="submit" onClick={onSubmit} className="btn btn-primary">
          Enviar
        </button>
      </form>
    </div>
  );
}
