import React, { useState } from 'react';
import './login.css';
import firebase from '../../config/firebase';

//authentication
import 'firebase/auth';

function Login() {

    //Usando o useState
    //Ele guarda o estado do componente e os dados
    //Conhecido como hooks do react também
    //Gravar estados de componente funcionais, ou seja componentes que chamam funções
    //Eles vão amazenar os conteudos dos campos 

    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [msgTipo, setMsgTipo] = useState();

    function logar() {
        // alert('VAMOS LOGAR')
        firebase.auth().signInWithEmailAndPassword(email, senha).then((resultado) => {
            setMsgTipo('sucesso')
            // alert('USUÁRIO LOGADO')
        }).catch(error => {
            setMsgTipo('error')
            console.log(error)
            // alert(error)
        })
    }


    return (
        <div className="login-content d-flex align-items-center">
            <form className="form-signin mx-auto">
                <img className="mb-4" src="/docs/4.4/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" />
                <h1 className="h3 mb-3 font-weight-normal text-white font-weight-bold text-center">LOGIN</h1>
                <label className="sr-only">Email address</label>
                <input onChange={(e) => setEmail(e.target.value)} type="email" id="inputEmail" className="form-control my-2" placeholder="Email" />
                <label className="sr-only">Password</label>
                <input onChange={(e) => setSenha(e.target.value)} type="password" id="inputPassword" className="form-control my-2" placeholder="Senha" />
                <button className="btn btn-lg btn-block btn-login" type="button" onClick={logar}>Logar</button>

                <div className="msg-login text-white text-center mt-2">
                    {/* UTILIZANDO O IF TERNÁRIO, SE A MSG FOR SUCESSO && QUE SIGNIFICA ENTÃO */}
                    {msgTipo === 'sucesso' && <span role="img" aria-label="sheep"><strong>WOW!</strong> Você está conectado! &#128526;</span>}
                    {msgTipo === 'error' && <span role="img" aria-label="sheep"><strong>OPS!</strong> Verifique se a senha ou usuário estão corretos! &#128527;</span> }
                </div>

                <div className="opcoes-login mt-5 text-center">
                    <a href="/#" className="mx-2">Recuperar senha</a>
                    <span className="text-white">&#9733;</span>
                    <a href="/#" className="mx-2">Quero me Cadastrar</a>
                </div>
            </form>
        </div>
    )
}

export default Login;