import React, { useState, useEffect } from 'react';
import './evento-card.css';
import { Link } from 'react-router-dom';
import firebase from '../../config/firebase';

function EventoCard({ id, img, titulo, detalhes, visualizacoes }) {

  const [urlImagem, setUrlImagem] = useState()

  //O useEffect por padrão é convocado quando o cartão é convocado uma vez
  //mas eu vou lá no fechamento dele, e coloco um parãmetro de array
  //Que é o [], e coloco a constante URLIMAGEM
  //E ele vai entender o seguinte, toda vez que essa constante URLIMAGEM mudar
  //ele renderiza a imagem novamente
  useEffect(() => {
    firebase.storage().ref(`imagens/${img}`).getDownloadURL().then((url) => {
      setUrlImagem(url)
    })
  }, [img])

  //Recuperando as informações do input

  return (
    <div className="col-md-3 col-sm-12">
      <img src={urlImagem} className="card-img-top img-cartao" alt="Imagem do Evento"></img>

      <div className="card-body">
        <h5>{titulo}</h5>
        <p className="card-text text-justify">
          {detalhes}
        </p>

        <div className="row rodape-card d-flex align-items-center">
          <div className="col-6 text-left">
            <Link to={"/detalhes-evento/" + id} className="btn btn-sm btn-detalhes">+ detalhes</Link>
          </div>

          <div className="col-6 text-right">
            <i className="fas fa-eye mr-2"></i><span>{visualizacoes}</span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default EventoCard
