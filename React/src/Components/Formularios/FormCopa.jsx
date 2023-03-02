import React,{useEffect} from 'react'
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchJugadores} from "../../Redux/Actions";

export const FormCopa = () => {
    const { register, handleSubmit, reset, errors } = useForm();

    let dispatch = useDispatch()
    dispatch(fetchJugadores())
    let jugadoresState = useSelector((state) => state.jugadores)
    console.log(jugadoresState)

 
    const onSubmit = (data) => {
   console.log(data);
   reset()
    };
  
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            
     
          />
          {errors.nombre && <span className="text-danger">Este campo es requerido</span>}
        </div>
  
        <div className="form-group">
          <label htmlFor="cantidadPartidas">Cantidad de partidas</label>
          <input
            type="number"
            className="form-control"
            id="cantidadPartidas"
            name="cantidadPartidas"
   
          />
          {errors.cantidadPartidas && <span className="text-danger">Este campo es requerido</span>}
        </div> */}
  
        <div className="form-group">
          <label htmlFor="jugadores">Jugadores</label>
          <select
  className="form-control"
  id="jugadores"
  name="jugadores"
>
  <option value="">Seleccione un jugador</option>
  {jugadoresState && jugadoresState.map((jugador) => (
    <option key={jugador._id} value={jugador._id}>
      {jugador.nombre}
    </option>
  ))}
</select>




          {errors.jugadores && <span className="text-danger">Debe seleccionar un jugador</span>}
        </div>
  
        <button type="submit" className="btn btn-primary">
          Guardar
        </button>
      </form>
    );
  }
