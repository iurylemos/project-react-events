import React, { useState, useEffect } from 'react';
import './cadastro-evento.css';
import { Link } from 'react-router-dom';
import firebase from '../../config/firebase';
import { useSelector } from 'react-redux';
import NavBar from '../../components/navbar';
import "firebase/storage";
import "firebase/firestore";

function CadastroEvento(props) {

    const [msgTipo, setMsgTipo] = useState();
    const [titulo, setTitulo] = useState();
    const [tipo, setTipo] = useState();
    const [detalhes, setDetalhes] = useState();
    const [data, setData] = useState();
    const [hora, setHora] = useState();
    const [fotoAtual, setFotoAtual] = useState();
    const [fotoNova, setFotoNova] = useState();
    const [carregando, setCarregando] = useState();

    //criando duas variaveis
    const storage = firebase.storage()
    const db = firebase.firestore()

    //Setando o usuário logado na variavel email
    const usuarioEmail = useSelector(state => state.usuarioEmail)

    useEffect(() => {

        if (props.match.params.id) {
            firebase.firestore().collection('eventos').doc(props.match.params.id).get().then((res) => {
                setTitulo(res.data().titulo)
                setTipo(res.data().tipo)
                setDetalhes(res.data().detalhes)
                setData(res.data().data)
                setHora(res.data().hora)
                setFotoAtual(res.data().foto)
            })
        }

        //Só atualize se o titulo mudar
    }, [carregando])


    function atualizarEvento() {

        setCarregando(1)
        setMsgTipo(null)
        if (fotoNova) {
            storage.ref(`imagens/${fotoNova.name}`).put(fotoNova);
        }
        db.collection('eventos').doc(props.match.params.id).update({
            titulo: titulo,
            tipo: tipo,
            detalhes: detalhes,
            data: data,
            hora: hora,
            foto: fotoNova ? fotoNova.name : fotoAtual
        }).then((res) => {
            setCarregando(0)
            setMsgTipo('sucesso')
        }).catch((err) => {
            setCarregando(0)
            setMsgTipo('error')
        })
    }

    function cadastrarEvento() {

        setCarregando(1)
        setMsgTipo(null)

        storage.ref(`imagens/${fotoNova.name}`).put(fotoNova).then((resultado) => {
            db.collection('eventos').add({
                titulo: titulo,
                tipo: tipo,
                detalhes: detalhes,
                data: data,
                hora: hora,
                usuario: usuarioEmail,
                visualizacoes: 0,
                foto: fotoNova.name,
                publico: 1,
                criacao: new Date()
            }).then((res) => {
                setCarregando(0)
                setMsgTipo('sucesso')
            }).catch((err) => {
                setCarregando(0)
                setMsgTipo('error')
            })
        })
    }


    return (
        <>
            <NavBar></NavBar>

            <div className="col-12 mt-2">
                <div className="row">
                    <h3 className="mx-auto font-weight-bold">{props.match.params.id ? 'Editar' : 'Novo Evento'}</h3>
                </div>
                <form>
                    <div className="form-group">
                        <label>Titulo:</label>
                        {/* Se titulo existir, o valor do input vai ser o titulo, e assim vai ter o atualizar */}
                        <input onChange={(e) => setTitulo(e.target.value)} type="text" className="form-control" value={titulo && titulo}></input>
                    </div>
                    <div className="form-group">
                        <label>Tipo do evento:</label>
                        <select onChange={(e) => setTipo(e.target.value)} className="form-control" value={tipo && tipo}>
                            <option disabled hidden>-- Selecione um tipo --</option>
                            <option>Festa</option>
                            <option>Teatro</option>
                            <option>Evento</option>
                            <option>Show</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Descrição do Evento:</label>
                        <textarea onChange={(e) => setDetalhes(e.target.value)} type="text" className="form-control" rows="3" value={detalhes && detalhes}></textarea>
                    </div>
                    <div className="form-group row">
                        <div className="col-6">
                            <label>Data do Evento:</label>
                            <input onChange={(e) => setData(e.target.value)} type="date" className="form-control" value={data && data}></input>
                        </div>
                        <div className="col-6">
                            <label>Hora do Evento:</label>
                            <input onChange={(e) => setHora(e.target.value)} type="time" className="form-control" value={hora && hora}></input>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Upload da Foto {props.match.params.id ? '(Caso queira manter a mesma foto, não precisa escolher uma nova imagem)' : null} :</label>
                        <input onChange={(e) => setFotoNova(e.target.files[0])} type="file" className="form-control"></input>
                    </div>

                    {/* SE A VARIAVEL CARREGANDO FOR VERDADEIRO QUE É O 1, ELE EXIBE O spinner
                    SE NÃO EXIBE O BOTÃO */}
                    {
                        carregando ? <div className="spinner-border text-dark mx-auto" role="status"><span className="sr-only">Loading...</span></div>
                            : <button onClick={props.match.params.id ? atualizarEvento : cadastrarEvento} type="button" className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro">{props.match.params.id ? 'Editar Evento' : 'Publicar Evento'}</button>
                    }



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