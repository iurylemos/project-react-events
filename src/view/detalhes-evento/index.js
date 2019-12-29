import React, { useState, useEffect } from 'react';
import './detalhes-evento.css';
import { Link } from 'react-router-dom';
import NavBar from '../../components/navbar';
import firebase from '../../config/firebase';
import { useSelector } from 'react-redux';


function DetalhesEvento(props) {

  const [evento, setEvento] = useState({});
  const [urlImg, setUrlImg] = useState();
  const [carregando, setCarregando] = useState(1);
  const usuarioLogado = useSelector(state => state.usuarioEmail);

  console.log(usuarioLogado)

  //Vou utilizar o userEffect para toda as vezes que carregar essa página, 
  //ele ir lá no firebase
  //E carregar as informações em tela.

  //Vou utilizar o props aqui, para recuperar esse id
  //Através da variavel pros que amazena os dados da rota
  //e através dessa rota eu faço uma consulta no banco de dados



  useEffect(() => {
    firebase.firestore().collection('eventos').doc(props.match.params.id).get().then((res) => {
      setEvento(res.data())

      console.log(evento)
      firebase.storage().ref(`imagens/${evento.foto}`).getDownloadURL().then((url) => {
        setUrlImg(url)
        setCarregando(0)
      })
    })
  }, [evento, props.match.params.id])

  return (
    <>
      <NavBar></NavBar>
      <h1>Detalhes do Evento</h1>
      <div className="container-fluid">

        {

          //Se carregando for maior que zero então ele apresenta o conteudo

          carregando > 0 ?
            <div className="row">
              <div class="spinner-border text-dark mx-auto mt-5" role="status"><span class="sr-only">Loading...</span></div>
            </div>
            :
            <div>
              <div className="row">
                <img src={urlImg} alt="Banner" className="img-banner"></img>
              </div>
              <div className="col-12 text-right mt-1 visualizacoes">
                <i className="fas fa-eye mr-2"></i><span>{evento.visualizacoes}</span>
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
                  <Link to="" className="btn-editar"><i className="fas fa-pen-square fa-3x"></i></Link>
                  : ''
              }
            </div>

        }

      </div>


    </>
  )
}

export default DetalhesEvento