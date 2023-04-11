import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteJugadores } from '../../Redux/Actions'
import { AgregarPuntajes } from '../Formularios/AgregarPuntajes'
import { FormCopa } from '../Formularios/FormCopa'
import { FormularioJugador } from '../Formularios/FormJugador'
import { FormJugadorCopa } from '../Formularios/FormJugadorCopa'
import s from './Admin.module.css'
import { FormCampaña } from '../Formularios/FormCampaña'

export const Admin = () => {

  let dispatch = useDispatch()
  let onClickDelete = () =>{
    dispatch(deleteJugadores()) }
     
 

  return (
    <div className={s.elemento}>
      <div className="accordion" id="accordionExample">
  <div className="accordion-item">
    <h2 className="accordion-header" id="headingOne">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
      Agregar jugador
      </button>
    </h2>
    <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div className="accordion-body">
      <div>
    <FormularioJugador/>
    </div>
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header" id="headingTwo">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
       Crear Copa
      </button>
    </h2>
    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
      <div className="accordion-body">
      <FormCopa/>
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header" id="headingThree">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        Agregar jugador a copa
      </button>
    </h2>
    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
      <div className="accordion-body">
      <FormJugadorCopa/>
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header" id="headingThree">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
        Agregar puntajes de jugador
      </button>
    </h2>
    <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
      <div className="accordion-body">
       <AgregarPuntajes/>
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header" id="headingThree">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
        Ganador de campaña
      </button>
    </h2>
    <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
      <div className="accordion-body">
     <FormCampaña/>
    </div>
  </div>
</div>
   
   
 
{/* <button type="button" className={'btn btn-danger'} data-bs-toggle="modal" data-bs-target="#exampleModal">
Eliminar todos los jugadores
</button> */}


<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Acción irreversible</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <p>¿Estás seguro que querés eliminar a todos los jugadores de la base de datos?</p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-primary" onClick={onClickDelete} data-bs-dismiss="modal">Sip</button>
        <button type="button" className="btn btn-danger">Nop</button>
      </div>
    </div>
  </div>
</div>
    </div>
    </div>
  )
}
