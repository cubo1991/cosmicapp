import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAliens } from '../../Redux/Actions'
import s from './Aliens.module.css'

export const Aliens = () => {
    const dispatch = useDispatch();
    const aliens = useSelector((state) => state.aliens);
  
    useEffect(() => {
      dispatch(fetchAliens());
    }, []);
  
    return (
     <div className={s.elemento}>
     <div className="container">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Poder</th>
              <th>Descripción</th>
              <th>Dificultad</th>
              <th>Expansión</th>
            </tr>
          </thead>
          <tbody>
            {aliens.map((alien) => (
              <tr key={alien._id}>
                <td>{alien.Nombre}</td>
                <td>{alien.Poder}</td>
                <td>{alien.Descripción}</td>
                <td>{alien.Dificultad}</td>
                <td>{alien.Expansión}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    );
  };
