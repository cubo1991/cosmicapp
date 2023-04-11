import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJugadores, fetchCopas, putCampaña } from '../../Redux/Actions';
import Select from 'react-select';

export const FormCampaña = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchJugadores());
    dispatch(fetchCopas());
  }, [dispatch]);

  const jugadoresState = useSelector((state) => state.jugadores);
  const [jugadoresSeleccionados, setJugadoresSeleccionados] = useState([]);

  let enviar = () =>{
dispatch(putCampaña(jugadoresSeleccionados))
  }


  const handleSelectChange = (selectedOptions) => {
    
    setJugadoresSeleccionados(selectedOptions);
    
  };
  let optionsJugador = jugadoresState.map((e => {
    return {
      value: e._id,
      label: e.nombre
    }})) 
  return (
    <div className="container mt-5">
      <form>
      <label htmlFor="jugadores">Selecciones jugadores:</label>
      <Select
  isMulti
  id="jugadores"
  options={optionsJugador}  
  onChange={handleSelectChange}
/>
      </form>
      <button type="button" className='btn btn-success mt-3' onClick={enviar} >
        Enviar
      </button>
    </div>
  );
};
