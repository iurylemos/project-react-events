import React from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function NavBar() {

    //useDispath é utilizado para enviar solicitações
    const dispatch = useDispatch();

    return (
        <nav className="navbar navbar-expand-lg">
            <span className="navbar-brand text-white font-weight-bold">Eventos</span>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <i className="fas fa-bars text-white"></i>
            </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active"><Link className="nav-link" to="">Home</Link></li>

                        {/* Se o usuário estiver logado ele mostra os dados de sair, publicar e etc
                        Se não ele mostra o cadastrar e login  */}

                        {
                            useSelector(state => state.usuarioLogado) > 0 ?
                            <>
                                <li className="nav-item active"><Link className="nav-link" to="">Publicar Evento</Link></li>
                                <li className="nav-item active"><Link className="nav-link" to="">Meus eventos</Link></li>
                                <li className="nav-item active"><Link className="nav-link" onClick={() => dispatch({type: 'LOG_OUT'})}>Sair</Link></li>
                            </>

                            :
                            <>
                                <li className="nav-item active"><Link className="nav-link" to="cadastro">Cadastrar</Link></li>
                                <li className="nav-item active"><Link className="nav-link" to="login">Login</Link></li>
                            </>
                            
                        }

                    </ul>
                </div>
        </nav>
    )
}

export default NavBar