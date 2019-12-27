import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

//Páginas
import Login from './view/login';
import Cadastro from './view/cadastro';
import Home from './view/home';

function App() {
  return (
    <Router>
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/cadastro" component={Cadastro}></Route>
      <Route exact path="/login" component={Login}></Route>
    </Router>
  );
}

export default App;
