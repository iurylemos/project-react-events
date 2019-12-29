import React from 'react';
import './detalhes-evento.css';
import { Link } from 'react-router-dom';
import firebase from '../../config/firebase';
import NavBar from '../../components/navbar';


function DetalhesEvento() {
  return (
    <>
      <NavBar></NavBar>
      <h1>Detalhes do Evento</h1>
      <div className="container-fluid">
        <div className="row">
          <img src="https://via.placeholder.com/150" alt="Banner" className="img-banner"></img>
        </div>
        <div className="row mt-5 d-flex justify-content-around">
          <div className="col-md-3 col-sm-12 box-info p-3 my-2">
            {/* ICONES */}
            <i className="fas fa-ticket-alt fa-2x"></i>
            <h5><strong>Tipo</strong></h5>
            <span className="mt-3">Festa</span>
          </div>
          <div className="col-md-3 col-sm-12 box-info p-3 my-2">
            {/* ICONES */}
            <i className="fas fa-calendar-alt alt fa-2x"></i>
            <h5><strong>Data</strong></h5>
            <span className="mt-3">10/10/2019</span>
          </div>
          <div className="col-md-3 col-sm-12 box-info p-3 my-2">
            {/* ICONES */}
            <i className="fas fa-clock fa-2x"></i>
            <h5><strong>Hora</strong></h5>
            <span className="mt-3">19:00</span>
          </div>
        </div>
        <div className="row box-detalhes mt-5">
          <h5 className="mx-auto"><strong>Detalhes do Evento</strong></h5>
          <p className="text-justify p-3">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
        </div>

        <Link to="" className="btn-editar"><i className="fas fa-pen-square fa-3x"></i></Link>


      </div>


    </>
  )
}

export default DetalhesEvento