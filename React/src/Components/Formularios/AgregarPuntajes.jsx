import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchJugadores, fetchCopas,putPuntosJugadores, putRanking } from '../../Redux/Actions';
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
      const [ordenados,setOrdenados] = useState([])
    let copaEncontrada = copasState.find(copa => copa._id === copaData.copaId)  || null
    
    let copa = copasState.find(copa => copa._id === copaData.copaId ) || []
    let jugadores = jugadoresState.filter(jugador => jugador.copasJugadas.some(copaJugada => copaJugada.copa === copaData.copaId))
    let jugadoresPodio = jugadores.map((jugador) => {
      let jugadoresCopa = {...jugador, copasJugadas: jugador.copasJugadas.find(copa => copa.copa === copaData.copaId)}
      return  jugadoresCopa
  
      
     })
    
     
     
     let renderJugadores = jugadoresPodio.map((jugador) => {
      let puntajesJugador = [];
      for (let i = 0; i < copa.cantidadPartidas; i++) {
        puntajesJugador.push(jugador.puntosPartidas[i]);
      }
    

  let numbers = jugador.copasJugadas.puntos
    let total = numbers.reduce((a, b) => Number(a) + Number(b), 0);
 
    
    return [total, jugador._id]
     
    });

let ordenarJugadores = () => {
  let jugadoresOrdenados = renderJugadores.sort((a, b) => {
    if (a[0] < b[0]) {
      return 1; // a es menor que b
    } else if (a[0] > b[0]) {
      return -1; // a es mayor que b
    } else {
      return 0; // a y b son iguales
    }
  })

  setOrdenados(jugadoresOrdenados)

  dispatch(putRanking(ordenados))
}


   
 
  
    
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
              idJugador: jugador._id,
              coloniasInternas: Number(formValues[`coloniasInternas-${jugador._id}`]),
              coloniasExternas: Number(formValues[`coloniasExternas-${jugador._id}`]),
              puntosVictoria: Number(formValues[`puntosVictoria-${jugador._id}`]),
              victoriaEspecial: formValues[`victoriaEspecial-${jugador._id}`] || false,
              ataqueSolitario: Number(formValues[`ataqueSolitario-${jugador._id}`]),
              defensaSolitaria: Number(formValues[`defensaSolitaria-${jugador._id}`]),
            };
          });
          let copa =  copaData.copaId
          let puntaje = [copa,jugadores]
        
         dispatch(putPuntosJugadores(puntaje))
  
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
       
      </form>
      {
      copaEncontrada && (copaEncontrada.partidasJugadas < copaEncontrada.cantidadPartidas)
      ?
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
<button type="submit" onClick={handleSubmit}className="btn btn-primary">
          Enviar
        </button>







      </form>
      :
      copaEncontrada && (copaEncontrada.partidasJugadas > 0)
      ?
        <button onClick={ordenarJugadores}>Finalizar Copa</button>
        :
        <p>Ingresar una copa valida</p>
     
     


      }
    </div>
    


    </div>
  )
}
