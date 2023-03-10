import React from "react";
import { Link } from "react-router-dom";
import logoCosmic from '../../Media/LogoCosmic.png';
import s from './NavBar.module.css'

export const NavBar = () => {
  return (
    <div className={s.navbar}>
      <div>
      <img src={logoCosmic} style={{height:"7rem"}} alt="Logo" />
      
        </div>  
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="# ">Mi Sitio</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav justify-content-evenly w-100">
            <li className="nav-item">
            <Link to="/" className="nav-link">INICIO</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="# ">Últimos Resultados</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="# ">Campañas</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="# ">Historial Cósmico</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="# ">Aliens</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="# ">Boletín Cósmico</a>
            </li>
            <li className="nav-item">
            <Link to="/admin" className="nav-link">Administrador</Link>
            
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </div>
  );
};