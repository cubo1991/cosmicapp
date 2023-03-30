import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { fetchJugadores, createCopa,fetchCopas } from '../../Redux/Actions';


export const FormCopa = () => {
  const [nombre, setNombre] = useState('');
  const [cantidadPartidas, setCantidadPartidas] = useState('');
  const [jugadores, setJugadores] = useState('');
  const [errors, setErrors] = useState({});



  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchJugadores());
  }, [dispatch]);


  const onSubmit = (e) => {
    e.preventDefault();
   
    setNombre('');
    setCantidadPartidas('');
    setJugadores('');
    dispatch(createCopa({ nombre, cantidadPartidas, jugadores }))
    .then(() => dispatch(fetchCopas()))
    .then(()=> setJugadores(''));
 
  
  };

  const handleNombreChange = (e) => {
    setNombre(e.target.value);
    setErrors((prevState) => ({ ...prevState, nombre: null }));
  };

  const handleCantidadPartidasChange = (e) => {
    setCantidadPartidas(e.target.value);
    setErrors((prevState) => ({ ...prevState, cantidadPartidas: null }));
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

   

  <button type="submit" className="btn btn-primary">
    Guardar
  </button>
</form>

  );
};