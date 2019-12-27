import React, { useState } from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg">
            <span className="navbar-brand text-white font-weight-bold">Eventos</span>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <i className="fas fa-bars text-white"></i>
            </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link className="nav-link" to="">Home</Link>
                        </li>
                        <li className="nav-item active">
                            <Link className="nav-link" to="cadastro">Cadastrar</Link>
                        </li>
                        <li className="nav-item active">
                            <Link className="nav-link" to="login">Login</Link>
                        </li>
                    </ul>
                </div>
        </nav>
    )
}

export default NavBar