import React, { useState } from 'react';
import './cadastro-evento.css';
import { Link } from 'react-router-dom';
import firebase from '../../config/firebase';
import { useSelector } from 'react-redux';
import NavBar from '../../components/navbar';
import "firebase/storage";
import "firebase/firestore";

function CadastroEvento() {

    const [msgTipo, setMsgTipo] = useState();
    const [titulo, setTitulo] = useState();
    const [tipo, setTipo] = useState();
    const [detalhes, setDetalhes] = useState();
    const [data, setData] = useState();
    const [hora, setHora] = useState();
    const [foto, setFoto] = useState();

    //criando duas variaveis
    const storage = firebase.storage()
    const db = firebase.firestore()

    //Setando o usuário logado na variavel email
    const usuarioEmail = useSelector(state => state.usuarioEmail)


    function cadastrarEvento() {

        setMsgTipo(null)

        storage.ref(`imagens/${foto.name}`).put(foto).then((resultado) => {
            db.collection('eventos').add({
                titulo: titulo,
                tipo: tipo,
                detalhes: detalhes,
                data: data,
                hora: hora,
                usuario: usuarioEmail,
                visualizacoes: 0,
                foto: foto.name,
                publico: 1,
                criacao: new Date()
            }).then((res) => {
                setMsgTipo('sucesso')
            }).catch((err) => {
                setMsgTipo('error')
            })
        })
    }


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
                        <input onChange={(e) => setTitulo(e.target.value)}  type="text" className="form-control"></input>
                    </div>
                    <div className="form-group">
                        <label>Tipo do evento:</label>
                        <select onChange={(e) => setTipo(e.target.value)}  className="form-control">
                            <option disabled selected hidden>-- Selecione um tipo --</option>
                            <option>Festa</option>
                            <option>Teatro</option>
                            <option>Evento</option>
                            <option>Show</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Descrição do Evento:</label>
                        <textarea onChange={(e) => setDetalhes(e.target.value)}  type="text" className="form-control" rows="3"></textarea>
                    </div>
                    <div className="form-group row">
                        <div className="col-6">
                            <label>Data do Evento:</label>
                            <input onChange={(e) => setData(e.target.value)}  type="date" className="form-control"></input>
                        </div>
                        <div className="col-6">
                            <label>Hora do Evento:</label>
                            <input onChange={(e) => setHora(e.target.value)}  type="time" className="form-control"></input>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Upload da Foto:</label>
                        <input onChange={(e) => setFoto(e.target.files[0])}  type="file" className="form-control"></input>
                    </div>

                    <button onClick={cadastrarEvento} type="button" className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro">
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