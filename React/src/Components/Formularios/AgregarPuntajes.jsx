import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchJugadores, fetchCopas, putJugadores } from '../../Redux/Actions';
import Select from "react-select";


export const AgregarPuntajes = () => {
    let dispatch = useDispatch();
    useEffect(() => {
      dispatch(fetchJugadores());
      dispatch(fetchCopas())
    }, [dispatch]);
    let jugadoresState = useSelector((state) => state.jugadores);
    let copasState = useSelector((state) => state.copas);
      const [copaData, setCopaData] = useState({
        copaId: '',      
      });
    let copaEncontrada = copasState.find(copa => copa._id === copaData.copaId) 
 
    console.log(copaEncontrada)
    
    const optionsCopa = copasState.map((e => {
        return {
          value: e._id,
          label: e.nombre
        } 
      
      }) )
      
      let optionsJugador = [];
      if (copaEncontrada) {
        optionsJugador = jugadoresState
          .filter(jugador => copaEncontrada.jugadores.includes(jugador._id))
          .map(jugador => ({
            value: jugador._id,
            label: jugador.nombre
          }));
      }

      let jugadoresMap = jugadoresState.map(e => <h2>hola</h2>);
    return (
    <div>
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
             
            }}        
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Enviar
        </button>
      </form>
      <form>
        {jugadoresMap}
      </form>
    </div>


    </div>
  )
}
