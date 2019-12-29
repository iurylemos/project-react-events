import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

//Páginas
import Login from './view/login';
import Cadastro from './view/cadastro';
import Home from './view/home';
import RecuperarSenha from './view/recuperar-senha';
import CadastroEvento from './view/cadastro-evento'
import DetalhesEvento from './view/detalhes-evento';

//Import para autenticação
import { PersistGate } from 'redux-persist/integration/react'

//Reducer
import { store, persistor } from '../src/store';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Route exact path="/" component={Home}></Route>
          <Route path="/eventos/:parametro" component={Home}></Route>
          <Route exact path="/cadastro" component={Cadastro}></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/recuperar-senha" component={RecuperarSenha}></Route>
          <Route exact path="/cadastro-evento" component={CadastroEvento}></Route>
          <Route path="/detalhes-evento/:id" component={DetalhesEvento}></Route>
          <Route path="/editar-evento/:id" component={CadastroEvento}></Route>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
