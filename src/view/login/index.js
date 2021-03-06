import React, { useState } from 'react';
import './login.css';
import { Link, Redirect } from 'react-router-dom';
import firebase from '../../config/firebase';
import { useSelector, useDispatch } from 'react-redux';

//useSelect é utilizado para amarzenar o estado lá no store
//useDispath é utilizado para enviar solicitações


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

    //useDispath é utilizado para enviar solicitações
    const dispatch = useDispatch();

    function logar() {
        // alert('VAMOS LOGAR')
        firebase.auth().signInWithEmailAndPassword(email, senha).then((resultado) => {
            setMsgTipo('sucesso')

            setTimeout(() => {
                dispatch({ type: 'LOG_IN', usuarioEmail: email })
            }, 2000);
            // alert('USUÁRIO LOGADO')
        }).catch(error => {
            setMsgTipo('error')
            console.log(error)
            // alert(error)
        })


    }

    //Vou verificar se o usuário está logado ou não
    //Ou seja vou verificar se o que está gravado no estado
    //De fato se o usuário está logado ou não
    // alert(useSelector(state => state.usuarioEmail))


    return (
        <div className="login-content d-flex align-items-center">

            {/* Vou utilizar aqui o redirect, se o usuário estiver logado */}
            {
                useSelector(state => state.usuarioLogado) > 0 ? <Redirect to=""></Redirect> : null
            }


            <form className="form-signin mx-auto">
                <i className="fas fa-grin-squint-tears text-center text-white fa-7x"></i>
                <h1 className="h3 mb-3 font-weight-normal text-white font-weight-bold text-center">Login</h1>
                <label className="sr-only">Email address</label>
                <input onChange={(e) => setEmail(e.target.value)} type="email" id="inputEmail" className="form-control my-2" placeholder="Email" />
                <label className="sr-only">Password</label>
                <input onChange={(e) => setSenha(e.target.value)} type="password" id="inputPassword" className="form-control my-2" placeholder="Senha" />
                <button className="btn btn-lg btn-block btn-login" type="button" onClick={logar}>Logar</button>

                <div className="msg-login text-white text-center mt-2">
                    {/* UTILIZANDO O IF TERNÁRIO, SE A MSG FOR SUCESSO && QUE SIGNIFICA ENTÃO */}
                    {msgTipo === 'sucesso' && <span role="img" aria-label="sheep"><strong>WOW!</strong> Você está conectado! &#128526;</span>}
                    {msgTipo === 'error' && <span role="img" aria-label="sheep"><strong>OPS!</strong> Verifique se a senha ou usuário estão corretos! &#128527;</span>}
                </div>

                <div className="opcoes-login mt-5 text-center">
                    <Link to="recuperar-senha" className="mx-2">Recuperar senha</Link>
                    <span className="text-white">&#9733;</span>
                    <Link to="cadastro" className="mx-2">Quero me Cadastrar</Link>
                </div>
            </form>
        </div>
    )
}

export default Login;