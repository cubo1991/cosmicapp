import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import {Routes, Route} from 'react-router-dom';
import { Home } from './Components/Home/Home';


function App() {
  return (
    <div className="App">
      <Routes>    
      <Route path ='/' component={Home}/> 
      </Routes>
      
    </div>
  );
}

export default App;
