import React from 'react';
import { BoletinCosmico } from '../BoletinCosmico/BoletinCosmico';
import { Feeds } from '../Feeds/Feeds';
import { ListaJugadores } from '../ListaJugadores/ListaJugadores';

import s from './Home.module.css';

export const Home = () => {
  return (
    <div className={s.fondo}>
      
      <div className={s.elementos}>
        {/* <BoletinCosmico /> */}
        <ListaJugadores />
        {/* <Feeds /> */}
      </div>
    </div>
  );
};