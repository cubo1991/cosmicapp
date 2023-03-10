import React from 'react'
import s from './ListaJugadores.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchJugadores, fetchRanking } from '../../Redux/Actions'
import { Lista } from './Lista/Lista'

export const ListaJugadores = () => {
let jugadoresTodos = useSelector((state) => state.jugadores)
let ranking = useSelector((state) => state.rankingJugadores)
let dispatch = useDispatch()
console.log(jugadoresTodos[0])
console.log(typeof jugadoresTodos)

React.useEffect(() => {  
  dispatch(fetchJugadores())
  dispatch(fetchRanking())

}, [ dispatch])
  return (
    <div className={s.prueba}><Lista jugadores={ranking}/></div>
  )
}
