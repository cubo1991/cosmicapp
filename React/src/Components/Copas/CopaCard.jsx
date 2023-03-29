import React,{useEffect} from 'react'
import s from './Copas.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCopas} from '../../Redux/Actions';
import { Link } from 'react-router-dom';


export const CopaCard = () => {
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCopas());
  }, [dispatch]);
  let copasState = useSelector((state) => state.copas);
  let copas = copasState.map((copa) => {
  return    <div>

  <div className="card" style={{"width": "18 rem"}}>

<div className="card-body">
  <h5 className="card-title">{copa.nombre}</h5>
{
  copa.campeon
  ?
  <p className="card-text">El campeón de esta copa es {copa.campeon}</p>
   :
   <p className="card-text">El Cosmos se está disputando todavía</p>
  


}
  
  
  <Link to={'/copas/' + copa._id}><p className="btn btn-primary">Entrá al detalle de la copa</p></Link>
</div>
</div>

  </div> 

  
  
  }
  )

  return (
    <div className={s.elemento}>{copas}</div>
  )
}
