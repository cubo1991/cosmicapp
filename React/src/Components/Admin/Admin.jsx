import React from 'react'
import { FormularioJugador } from '../Formularios/FormJugador'
import s from './Admin.module.css'

export const Admin = () => {
 
  return (
    <div className={s.elemento}>
    <div>
    <h2>Agregar jugador</h2>
    <FormularioJugador/>

    </div>
    
    </div>
  )
}
