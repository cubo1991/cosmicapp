import React, { useState } from "react";
import { Link } from "react-router-dom";
import logoCosmic from '../../Media/LogoCosmic.png';
import s from './NavBar.module.css'

export const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className={s.navbar}>
      <div>
      <img src={logoCosmic} style={{height:"7rem"}} alt="Logo" />
      
        </div>  
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="# ">Mi Sitio</a>
        <button className="navbar-toggler" type="button" onClick={handleMenuToggle}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={"collapse navbar-collapse justify-content-center" + (isMenuOpen ? " show" : "")} id="navbarNav">
          <ul className="navbar-nav justify-content-evenly w-100">
            <li className="nav-item">
            <Link to="/" className="nav-link" onClick={handleLinkClick}>INICIO</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="# " onClick={handleLinkClick}>Últimos Resultados</a>
            </li>
            <li className="nav-item">
            <Link to="/copas" className="nav-link" onClick={handleLinkClick}>Copas</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="# " onClick={handleLinkClick}>Historial Cósmico</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="# " onClick={handleLinkClick}>Aliens</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="# " onClick={handleLinkClick}>Boletín Cósmico</a>
            </li>
            <li className="nav-item">
            <Link to="/admin" className="nav-link" onClick={handleLinkClick}>Administrador</Link>
            
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </div>
  );
};