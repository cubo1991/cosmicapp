import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchJugadores, fetchCopas,putPuntosJugadores } from '../../Redux/Actions';
import Select from "react-select";


export const AgregarPuntajes = () => {

  
  const [ejemplo, setEjemplo] = useState([])

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
 
  
    
    const optionsCopa = copasState.map((e => {
        return {
          value: e._id,
          label: e.nombre
        } 
      
      }) )
  
      const [formValues, setFormValues] = useState([{}]);

      const handleInputChange = (event) => {
        const { id, value } = event.target;
        setFormValues((values) => ({
          ...values,
          [id]: value,
        }));
       
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        const jugadores = jugadoresState
          .filter((jugador) => copaEncontrada.jugadores.includes(jugador._id))
          .map((jugador) => {
            return {
              jugador: jugador._id,
              coloniasInternas: formValues[`coloniasInternas-${jugador._id}`],
              coloniasExternas: formValues[`coloniasExternas-${jugador._id}`],
              puntosVictoria: formValues[`puntosVictoria-${jugador._id}`],
              victoriaEspecial: formValues[`victoriaEspecial-${jugador._id}`] || false,
              ataqueSolitario: formValues[`ataqueSolitario-${jugador._id}`],
              defensaSolitaria: formValues[`defensaSolitaria-${jugador._id}`],
            };
          });
         console.log(jugadores, copaData.copaId);
         dispatch(putPuntosJugadores(jugadores,copaData.copaId))
          
      };
      let jugadoresMap = [];
      if (copaEncontrada) {
        jugadoresMap = jugadoresState
          .filter(jugador => copaEncontrada.jugadores.includes(jugador._id))
          .map(jugador => (
            <tr key={jugador._id}>
              <td >{jugador.nombre}</td>
              <td>
                <div class="mb-3">
                  <label htmlFor="coloniasInternas" class="form-label"></label>
                  <input type="number" class="form-control" id={`coloniasInternas-${jugador._id}`} aria-describedby="coloniasInternas" onChange={handleInputChange} />
                  <div id='coloniasInternas'  class="form-text"></div>
                </div>
              </td>
              <td>
                <div class="mb-3">
                  <label htmlFor="coloniasExternas" class="form-label"></label>
                  <input type="number" class="form-control"  id={`coloniasExternas-${jugador._id}`} aria-describedby="coloniasExternas" onChange={handleInputChange} />
                  <div id="coloniasExternas" class="form-text"></div>
                </div>
              </td>
              <td>
                <div class="mb-3">
                  <label htmlFor="puntosVictoria" class="form-label"></label>
                  <input type="number" class="form-control" id={`puntosVictoria-${jugador._id}`} aria-describedby="puntosVictoria" onChange={handleInputChange} />
                  <div  id="puntosVictoria" class="form-text"></div>
                </div>
              </td>
              <td>
                <div class="mb-1 d-flex justify-content-center">
                <input type="checkbox" className="form-check-input" id={`victoriaEspecial-${jugador._id}`}  onChange={handleInputChange} />
              <label htmlFor="victoriaEspecial" className="form-label"/>
                </div>
              </td>
              <td>
                <div class="mb-3">
                  <label htmlFor="ataqueSolitario" class="form-label"></label>
                  <input type="number" class="form-control" id={`ataqueSolitario-${jugador._id}`} aria-describedby="ataqueSolitario" onChange={handleInputChange} />
                  <div id="ataqueSolitario"  class="form-text"></div>
                </div>
              </td>
              <td>
                <div class="mb-3">
                  <label htmlFor="defensaSolitaria" class="form-label"></label>
                  <input type="number" class="form-control" id={`defensaSolitaria-${jugador._id}`} aria-describedby="defensaSolitaria" onChange={handleInputChange} />
                  <div id="defensaSolitaria"  class="form-text"></div>
                </div>
              </td>
            </tr>
          ));
      }

      
    return (
    <div>
          <div className="container mt-5">
      <form>
        <div className="form-group">
          <label htmlFor="idCopa">Nombre de la copa:</label>
          <Select
          id="idCopa"
          options={optionsCopa}
          onChange={(options)=> {           
            setCopaData((copa) => ({...copa,copaId: options.value}))
          }}  
          />
        </div>
        {/* <div className="form-group">
          <label htmlFor="idJugador">ID del jugador:</label>
          <Select
            id="idJugador"
            isMulti
            options={optionsJugador}   
            onChange={(options)=> {
             
            }}        
          />
        </div> */}
        <button type="submit" onClick={handleSubmit}className="btn btn-primary">
          Enviar
        </button>
      </form>
      <form>
      <table>
  <thead>
    <tr>
      <th>Nombre</th>
      <th>Colonias internas</th>
      <th>Colonias externas</th>
      <th>Puntos de victoria</th>
      <th>Victoria especial</th>
      <th>Ataque solitario</th>
      <th>Defensa solitaria</th>
    </tr>
  </thead>
  <tbody>
    {jugadoresMap}
  </tbody>
</table>







      </form>
    </div>


    </div>
  )
}
