import React, { useState } from 'react';

import './home.css';

import { Link } from 'react-router-dom';
//Componentes
import NavBar from '../../components/navbar';
import { useSelector, useDispatch } from 'react-redux';

function Home() {
    return (

        // TAG FRAGMENT <>
        // É utilizada para devolver um único elemento
        //Ela não tem efeito de visual nenhum
        //Ela apenas encapsula todos os elementos, para devolver no visual apenas 1
        <>
            <NavBar></NavBar>
            <h1>{useSelector(state => state.usuarioEmail)}</h1>
            <h1>Logado: {useSelector(state => state.usuarioLogado)}</h1>
        </>

    )
}

export default Home