import React, { useState } from 'react';

import firebase from '../../config/firebase';

//authentication
import 'firebase/auth';

import './cadastro.css'

function Cadastro() {

    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [msgTipo, setMsgTipo] = useState();
    const [msg, setMsg] = useState();
    const [carregando, setCarregando] = useState();

    function cadastrar() {
        setCarregando(1);
        setMsgTipo(null);

        //Se no campo e-mail estiver vázio
        if(!email || !senha) {
            setMsgTipo('error')
            setMsg('Você precisa informar o e-mail e senha para fazer o cadastro')
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(email, senha).then((resultado) => {
            setMsgTipo('sucesso')
            setCarregando(0)
        }).catch((error) => {
            setCarregando(0)
            setMsgTipo('error')
            switch(error.message) {
                case 'Password should be at least 6 characters':
                    setMsg('A senha deve ter pelo menos 6 caracteres')
                    break;
                case 'The email address is already in use by another account.':
                    setMsg('Este e-mail já está sendo utilizado por outro usuário')
                    break;
                case 'The email address is badly formatted.':
                    setMsg('O formato do seu e-mail é invalido!')
                    break;
                default:
                    setMsg('Não foi possível cadastrar. Tente novamente mais tarde!')
                    break;
            }
        })
    }

    return (
        <div className="form-cadastro">
            <form className="text-center form-login mx-auto mt-5">
                <h1 className="h3 mb-3 text-black font-weight-bold">Cadastro</h1>
                <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control my-2" placeholder="Email"></input>
                <input onChange={(e) => setSenha(e.target.value)}  type="password" className="form-control my-2" placeholder="Senha"></input>

                {/* SE A VARIAVEL CARREGANDO FOR VERDADEIRO QUE É O 1, ELE EXIBE O spinner
                SE NÃO EXIBE O BOTÃO */}
                {
                    carregando ? <div class="spinner-border text-dark" role="status"><span class="sr-only">Loading...</span></div>
                    : <button onClick={cadastrar} type="button" className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro">Cadastrar</button>
                }

                <div className="msg-login text-black text-center mt-2">
                    {/* UTILIZANDO O IF TERNÁRIO, SE A MSG FOR SUCESSO && QUE SIGNIFICA ENTÃO */}
                    {msgTipo === 'sucesso' && <span role="img" aria-label="sheep"><strong>WOW!</strong> Usuário cadastrado com sucesso! &#128526;</span>}
                    {msgTipo === 'error' && <span role="img" aria-label="sheep"><strong>OPS!</strong> { msg } &#128527;</span> }
                </div>
            </form>
        </div>
    )
}

export default Cadastro
