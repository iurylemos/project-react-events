import React, { useState, useEffect } from 'react';
import './detalhes-evento.css';
import { Link, Redirect } from 'react-router-dom';
import NavBar from '../../components/navbar';
import firebase from '../../config/firebase';
import { useSelector } from 'react-redux';


function DetalhesEvento(props) {

  const [evento, setEvento] = useState({});
  const [urlImg, setUrlImg] = useState();
  const [carregando, setCarregando] = useState(1);
  const [excluir, setExcluir] = useState(0);
  const usuarioLogado = useSelector(state => state.usuarioEmail);

  // console.log(usuarioLogado)

  function removerEvento() {
    firebase.firestore().collection('eventos').doc(props.match.params.id).delete().then(() => {
      setExcluir(1);
    })
  }




  //Vou utilizar o userEffect para toda as vezes que carregar essa página, 
  //ele ir lá no firebase
  //E carregar as informações em tela.

  //Vou utilizar o props aqui, para recuperar esse id
  //Através da variavel pros que amazena os dados da rota
  //e através dessa rota eu faço uma consulta no banco de dados


  //UseEffect é um gatilho para toda vez que algum elemento,
  //Tem o seu conteudo alterado

  useEffect(() => {

    if (carregando) {
      firebase.firestore().collection('eventos').doc(props.match.params.id).get().then((res) => {
        setEvento(res.data())
        //Implementando a quantidade de visualizações 
        //E atualizando de acordo com o banco
        //E incremento no campo de visualizações + 1
        // E todas as vezes que ele entrar aqui vai ser incrementado no campo 
        //De visualizações
        firebase.firestore().collection('eventos').doc(props.match.params.id).update('visualizacoes', res.data().visualizacoes + 1)

        console.log(evento)
        firebase.storage().ref(`imagens/${res.data().foto}`).getDownloadURL().then((url) => {
          setUrlImg(url)
          setCarregando(0)
        })
      })
    } else {
      firebase.storage().ref(`imagens/${evento.foto}`).getDownloadURL().then(url => setUrlImg(url))
    }


  }, [])

  return (
    <>
      <NavBar></NavBar>

      {/* Se o excluir for maior que 0, ou seja se a pessoa
      Excluiu o evento, ele vai ser redirecionado para a HOME */}

      {
        excluir > 0 ? <Redirect to="/"></Redirect> : null
      }

      <h1>Detalhes do Evento</h1>
      <div className="container-fluid">

        {

          //Se carregando for maior que zero então ele apresenta o conteudo

          carregando > 0 ?
            <div className="row">
              <div className="spinner-border text-dark mx-auto mt-5" role="status"><span className="sr-only">Loading...</span></div>
            </div>
            :
            <div>
              <div className="row">
                <img src={urlImg} alt="Banner" className="img-banner"></img>
              </div>
              <div className="col-12 text-right mt-1 visualizacoes">
                <i className="fas fa-eye mr-2"></i><span>{evento.visualizacoes + 1}</span>
              </div>
              <h3 className="mx-auto mt-5 titulo"><strong>{evento.titulo}</strong></h3>
              <div className="row mt-5 d-flex justify-content-around">
                <div className="col-md-3 col-sm-12 box-info p-3 my-2">
                  {/* ICONES */}
                  <i className="fas fa-ticket-alt fa-2x"></i>
                  <h5><strong>Tipo</strong></h5>
                  <span className="mt-3">{evento.tipo}</span>
                </div>
                <div className="col-md-3 col-sm-12 box-info p-3 my-2">
                  {/* ICONES */}
                  <i className="fas fa-calendar-alt alt fa-2x"></i>
                  <h5><strong>Data</strong></h5>
                  <span className="mt-3">{evento.data}</span>
                </div>
                <div className="col-md-3 col-sm-12 box-info p-3 my-2">
                  {/* ICONES */}
                  <i className="fas fa-clock fa-2x"></i>
                  <h5><strong>Hora</strong></h5>
                  <span className="mt-3">{evento.hora}</span>
                </div>
              </div>
              <div className="row box-detalhes mt-5">
                <div className="col-12 text-center">
                  <h5><strong>Detalhes do Evento</strong></h5>
                </div>
                <div className="col-12 text-center">
                  <p>{evento.detalhes}</p>
                </div>
              </div>

              {
                //O usuário que está logado é o mesmo que publicou esse evento?
                //Se for igual é por que ele pode editar, se não mostra vázio
                usuarioLogado === evento.usuario ?
                  <Link to={`/editar-evento/${props.match.params.id}`} className="btn-editar"><i className="fas fa-pen-square fa-3x"></i></Link>

                  : ''
              }

              {
                usuarioLogado === evento.usuario ?
                  <button onClick={removerEvento} type="button" className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro">Remover Evento</button>
                  : null
              }

            </div>
        }

      </div>


    </>
  )
}

export default DetalhesEvento