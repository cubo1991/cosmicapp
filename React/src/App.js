
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


function App() {
  return (
    <div className="App">
      <NavBar/>
      <Routes>    
      <Route path ='/' element={<Home/>}/> 
      <Route path='/admin' element={<Admin/>}/>
      <Route path='/copas' element={<Copas/>}/>
      <Route path='/copas/:id' element={<CopaDetail/>}/>
      </Routes>
      
      
    </div>
  );
}

export default App;
