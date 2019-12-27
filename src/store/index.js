import { createStore } from 'react-redux';

import usuarioReducer from './usuarioReducer'

const store = createStore(usuarioReducer);

export default store;