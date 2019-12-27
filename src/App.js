import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

//Páginas
import Login from './view/login';
import Cadastro from './view/cadastro';

function App() {
  return (
    <Router>
      <Route exact path="/" component={Login}></Route>
      <Route exact path="/cadastro" component={Cadastro}></Route>
    </Router>
  );
}

export default App;
