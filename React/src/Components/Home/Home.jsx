import React from 'react'
import { BoletinCosmico } from '../BoletinCosmico/BoletinCosmico'
import { Feeds } from '../Feeds/Feeds'
import { ListaJugadores } from '../ListaJugadores/ListaJugadores'
import { NavBar } from '../NavBar/NavBar'
import s from './Home.module.css'

export const Home = () => {
  return (
    <div className={s.fondo}>
        <div>
        <NavBar/>
        </div>
        <div className={s.elementos}>
        <BoletinCosmico/>
        <ListaJugadores/>  
        <Feeds/>      
        
        </div>
    </div>
  )
}
