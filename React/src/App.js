import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import { Home } from './Components/Home/Home';
import { Route, Routes } from 'react-router-dom';
import { Admin } from './Components/Admin/Admin';
import { NavBar } from './Components/NavBar/NavBar';
import { Copas } from './Components/Copas/Copas';
import { CopaDetail } from './Components/Copas/CopaDetail';
import { Jugador } from './Components/Jugador/Jugador';
import { Aliens } from './Components/Alien/Aliens';


function App() {
  return (
    <div className="App">
      <NavBar/>
      <Routes>    
      <Route path ='/' element={<Home/>}/> 
      <Route path='/admin' element={<Admin/>}/>
      <Route path='/copas' element={<Copas/>}/>
      <Route path='/copas/:id' element={<CopaDetail/>}/>
      <Route path='/jugadores/:id' element={<Jugador/>}/>
      <Route path='/aliens' element={<Aliens/>}/>
      </Routes>
      
      
    </div>
  );
}

export default App;
