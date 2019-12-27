import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

//Páginas
import Login from './view/login';
import Cadastro from './view/cadastro';
import Home from './view/home';

//Reducer
import store from '../src/store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/cadastro" component={Cadastro}></Route>
        <Route exact path="/login" component={Login}></Route>
      </Router>
    </Provider>
  );
}

export default App;
