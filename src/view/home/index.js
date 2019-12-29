import React, { useState, useEffect } from 'react';

//USE EFFECT é um recurso que faz que quando a tela estiver carregada
//Ele então executa algo..

import './home.css';

// import { Link } from 'react-router-dom';
//Componentes
import NavBar from '../../components/navbar';
import { useSelector } from 'react-redux';
import firebase from '../../config/firebase'
import EventoCard from '../../components/evento-card';

function Home({ match }) {

    //Com a variavel match que é uma props
    //eu consigo recuperar qual rota eu estou

    //Variavel para os eventos
    //E assim estou dizendo que os eventos são um array
    const [eventos, setEventos] = useState([]);
    const [pesquisa, setPesquisa] = useState('');
    let listaEventos = [];
    const usuarioEmail = useSelector(state => state.usuarioEmail);

    useEffect(() => {

        //Se a rota tiver parametros, e tiver parametro
        //Que é a rota que eu definir no APP.JS
        //Então essa vai ser a rota de meus eventos
        if (match.params.parametro) {
            // alert('Aqui vai aparecer somente os eventos do usuário logado')
            //A diferença é que para buscar pelo usuário eu utilizo o where
            //No primeiro parâmetro eu passo qual campo eu quero avaliar
            //Que eu quero filtrar a minha consulta
            //Que no caso vai ser o do usuário
            //no segundo parametro eu digo qual é operador lógico
            //No caso é o de igualdade
            //E o 3º parâmetro eu passo o dado do usuário
            //Eu tenho utilizando o redux
            firebase.firestore().collection('eventos').where('usuario', '==', usuarioEmail).get().then(async (resultado) => {
                await resultado.docs.forEach(doc => {
                    //Como dentro do documento eu possuo os id
                    //E dentro do id eu possuo os dados
                    //eu utilizo o operador de SPRAD ...
                    //E ele pega tudo que tem dentro desse id.

                    //Verificando se o documento titulo
                    //tiver em algum caractere da pesquisa
                    //Index of ele pesquisa se o que estou pesquisando
                    //Existe nos documentos

                    if (doc.data().titulo.indexOf(pesquisa) >= 0) {
                        listaEventos.push({
                            id: doc.id,
                            ...doc.data()
                        })
                    }
                })
                setEventos(listaEventos);
            })
        } else {
            firebase.firestore().collection('eventos').get().then(async (resultado) => {
                await resultado.docs.forEach(doc => {
                    //Como dentro do documento eu possuo os id
                    //E dentro do id eu possuo os dados
                    //eu utilizo o operador de SPRAD ...
                    //E ele pega tudo que tem dentro desse id.

                    //Verificando se o documento titulo
                    //tiver em algum caractere da pesquisa
                    //Index of ele pesquisa se o que estou pesquisando
                    //Existe nos documentos

                    if (doc.data().titulo.indexOf(pesquisa) >= 0) {
                        listaEventos.push({
                            id: doc.id,
                            ...doc.data()
                        })
                    }
                })
                setEventos(listaEventos);
            })
        }
    }, [])



    return (
        // TAG FRAGMENT <>
        // É utilizada para devolver um único elemento
        //Ela não tem efeito de visual nenhum
        //Ela apenas encapsula todos os elementos, para devolver no visual apenas 1
        <>
            <NavBar></NavBar>
            {/* <h1>{useSelector(state => state.usuarioEmail)}</h1>
            <h1>Logado: {useSelector(state => state.usuarioLogado)}</h1> */}

            <div className="row p-5">
                <h3 className="mx-auto pb-3">Eventos Publicados</h3>
                <input onChange={(e) => setPesquisa(e.target.value)} type="text" className="form-control text-center" placeholder="Pesquisar evento pelo título..."></input>
            </div>

            <div className="row p-3">
                {
                    //Aqui é um tipo de for com o map
                    eventos.map(item =>
                        <EventoCard key={item.id} id={item.id} img={item.foto} titulo={item.titulo} detalhes={item.detalhes} visualizacoes={item.visualizacoes} ></EventoCard>
                    )
                }
            </div>


        </>

    )
}

export default Home