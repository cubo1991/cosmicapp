import React from 'react'
import { BoletinCosmico } from '../BoletinCosmico/BoletinCosmico'
import { Feeds } from '../Feeds/Feeds'
import { ListaJugadores } from '../ListaJugadores/ListaJugadores'
import { NavBar } from '../NavBar'
import s from './Home.module.css'

export const Home = () => {
  return (
    <div className={s.fondo}>
        <div>
        <NavBar/>
        </div>
        <div className={s.elementos}>
        <Feeds/>
        <ListaJugadores/>        
        <BoletinCosmico/>
        </div>
    </div>
  )
}
