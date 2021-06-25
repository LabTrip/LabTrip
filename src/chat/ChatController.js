import Viagem from './Viagem'
const jwt = require('jsonwebtoken');
import {mailer} from '../smtpConfig'
import EmailConviteTemplate from '../template/EmailConviteTemplate'
require('dotenv/config');
import api from '../requesterConfig'

export default class ViagemController {

  constructor(chatRepository) {
    this.chatRepository = chatRepository;
  }

  //GET /viagens
  async buscaTodos(req, res) {
    try{
      
      let viagens;

      switch(req.acesso.tipoAcesso){
        case 'Total':
            viagens = await this.chatRepository.buscaTodos();
          break;
        case 'Gerencial':
            viagens = await this.chatRepository.buscaTodosDaAgencia(req.token.agenciaId);
          break;
        case 'Parcial':
            viagens = await this.chatRepository.buscaTodosComPermissao(req.token.id);
          break;
        default:
            return res.status(403).json({status:'403', mensagem:'Acesso restrito.'})
      }
      
      viagens = await this.atualizaStatusAutomatico(viagens);

      res.status(200).json(viagens.map(u => viagemViewModel(u)));
    }
    catch(e){
      return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
    }
  }

  async notificaViagem(req, viagem, operacao){
    try{
      let titulo, mensagem, dado;
      const participantes = await this.chatRepository.buscaParticipantes(viagem);

      switch(operacao){
        case 'POST':
          titulo = 'Nova viagem criada'
          mensagem = 'A viagem ' + viagem.descricao + ' foi criada e você foi adicionado à ela.'
          break;
        case 'PUT':
          titulo = 'Viagem atualizada'
          mensagem = 'A viagem ' + viagem.descricao + ' que você participa foi atualizada.'
          break;
      }

      const body = {
        participantes: participantes,
        titulo: titulo,
        mensagem: mensagem,
        dado: viagem
      }

      this.notifica(req, body);
    }
    catch(e){
      console.log(e)
    }
    
  }


  async notifica(req, body) {
    await api.post("notificacoes/", body,
      {
        headers: {
          'x-access-token': req.headers['x-access-token']
      }
    }).then((response) => {
        //console.log('Response ' + response.data.perfis)
    }).catch((err) => {
        console.error("ops! ocorreu um erro" + err);
        return undefined;
    });
  }

}