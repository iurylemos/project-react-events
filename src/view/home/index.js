import React, { useState, useEffect } from 'react';

//USE EFFECT é um recurso que faz que quando a tela estiver carregada
//Ele então executa algo..

import './home.css';

// import { Link } from 'react-router-dom';
//Componentes
import NavBar from '../../components/navbar';
import { useSelector } from 'react-redux';
import firebase from '../../config/firebase'
import EventoCard from '../../components/evento-card'

function Home() {


    //Variavel para os eventos
    //E assim estou dizendo que os eventos são um array
    const [eventos, setEventos] = useState([]);
    let listaEventos = [];

    useEffect(() => {
        firebase.firestore().collection('eventos').get().then(async (resultado) => {
            await resultado.docs.forEach(doc => {
                //Como dentro do documento eu possuo os id
                //E dentro do id eu possuo os dados
                //eu utilizo o operador de SPRAD ...
                //E ele pega tudo que tem dentro desse id.
                //

                listaEventos.push({
                    id: doc.id,
                    ...doc.data()
                })
            })
            setEventos(listaEventos);
        })
    })



    return (
        // TAG FRAGMENT <>
        // É utilizada para devolver um único elemento
        //Ela não tem efeito de visual nenhum
        //Ela apenas encapsula todos os elementos, para devolver no visual apenas 1
        <>
            <NavBar></NavBar>
            <h1>{useSelector(state => state.usuarioEmail)}</h1>
            <h1>Logado: {useSelector(state => state.usuarioLogado)}</h1>

            <div className="row">
                {
                    //Aqui é um tipo de for com o map
                    eventos.map(item => <EventoCard key={item.id} img={item.foto} titulo={item.titulo} detalhes={item.detalhes} visualizacoes={item.visualizacoes} ></EventoCard>)
                }
            </div>


        </>

    )
}

export default Home