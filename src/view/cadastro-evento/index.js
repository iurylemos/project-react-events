import React, { useState } from 'react';
import './cadastro-evento.css';
import { Link, Redirect } from 'react-router-dom';
import firebase from '../../config/firebase';
import { useSelector } from 'react-redux';
import NavBar from '../../components/navbar';

function CadastroEvento() {

    const [msgTipo, setMsgTipo] = useState()



    return (
        <>
            <NavBar></NavBar>
            <div className="col-12 mt-2">
                <div className="row">
                    <h3 className="mx-auto font-weight-bold">Novo Evento</h3>
                </div>
                <form>
                    <div className="form-group">
                        <label>Titulo:</label>
                        <input type="text" className="form-control"></input>
                    </div>
                    <div className="form-group">
                        <label>Tipo do evento:</label>
                        <select className="form-control">
                            <option disabled selected hidden>-- Selecione um tipo --</option>
                            <option>Festa</option>
                            <option>Teatro</option>
                            <option>Evento</option>
                            <option>Show</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Descrição do Evento:</label>
                        <textarea type="text" className="form-control" rows="3"></textarea>
                    </div>
                    <div className="form-group row">
                        <div className="col-6">
                            <label>Data do Evento:</label>
                            <input type="date" className="form-control"></input>
                        </div>
                        <div className="col-6">
                            <label>Hora do Evento:</label>
                            <input type="time" className="form-control"></input>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Upload da Foto:</label>
                        <input type="file" className="form-control"></input>
                    </div>

                    <button type="button" className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro">
                        Publicar Evento
                    </button>

                </form>

                <div className="msg-login text-black text-center mt-2">
                    {/* UTILIZANDO O IF TERNÁRIO, SE A MSG FOR SUCESSO && QUE SIGNIFICA ENTÃO */}
                    {msgTipo === 'sucesso' && <span role="img" aria-label="sheep"><strong>WOW!</strong> Evento publicado! &#128526;</span>}
                    {msgTipo === 'error' && <span role="img" aria-label="sheep"><strong>OPS!</strong> Não foi possível publicar o evento! &#128527;</span>}
                </div>

                <div className="opcoes-login mt-5 text-center">
                    <Link to="recuperar-senha" className="mx-2">Recuperar senha</Link>
                    <span className="text-white">&#9733;</span>
                    <Link to="cadastro" className="mx-2">Quero me Cadastrar</Link>
                </div>
            </div>
        </>
    )
}

export default CadastroEvento