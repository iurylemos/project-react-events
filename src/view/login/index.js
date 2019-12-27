import React from 'react';
import './login.css'

function Login() {
    return (
        <div className="login-content d-flex align-items-center">
            <form className="form-signin mx-auto">
                <img className="mb-4" src="/docs/4.4/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" />
                <h1 className="h3 mb-3 font-weight-normal text-white font-weight-bold text-center">LOGIN</h1>
                <label className="sr-only">Email address</label>
                <input type="email" id="inputEmail" className="form-control my-2" placeholder="Email" />
                <label className="sr-only">Password</label>
                <input type="password" id="inputPassword" className="form-control my-2" placeholder="Senha" />
                <button className="btn btn-lg btn-block btn-login" type="submit">Sign in</button>

                <div className="msg-login text-white text-center mt-2">
                    <span>
                        <strong>WOW!</strong> Você está conectado! &#128526;
                    </span>
                    <span>
                        <strong>OPS!</strong> Verifique se a senha ou usuário estão corretos! &#128527;
                    </span>
                </div>

                <div className="opcoes-login mt-5 text-center">
                    <a href="#" className="mx-2">Recuperar senha</a>
                    <span className="text-white">&#9733;</span>
                    <a href="#" className="mx-2">Quero me Cadastrar</a>
                </div>
            </form>
        </div>
    )
}

export default Login;