import Chat from './Chat'
const moment = require('moment')
import api from '../requesterConfig'
const logger = require('../logger');

const chatViewModel = (chat) => ({
    id: chat.id,
    viagemId: chat.viagemId,
    nome: chat.nome,
    topicoId: chat.topicoId,
    descTopico: chat.descTopico,
    mensagens: chat.mensagens
  });  
  
  export default class ChatController {
  
    constructor(chatRepository) {
      this.chatRepository = chatRepository;
      this.users = [];
    }
  
    //GET 
    async buscaTodos(req, res) {
      try{
        const chats = await this.chatRepository.buscaTodos();
        res.status(200).json(chats.map(u => chatViewModel(u)));
      }
      catch(e){
        logger.error(e)
        logger.info(e.toString(), req.token)
        return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
      }
      
    }

    conectaAoChat(id, username, userId, room, chat, token) {
      try{
        const user = { id, username, userId, room , chat, token};

        this.users.push(user);

        return user;
      }
      catch(e){
        logger.error(e)
        logger.info(e.toString(), req.token)
        return undefined;
      }
      
    }

    buscaUsuariosDaSala(room) {
      try{
        return this.users.filter(user => user.room === room);
      }
      catch(e){
        logger.error(e)
        logger.info(e.toString(), req.token)
        return undefined;
      }
      
    }

    async notificaUsuarioChat(user) {
      try{
        const viagemId = user.room.split('/')[0]
        const contexto = user.room.split('/')[1]

        await this.notificaRoteiro(user.token, user.userId, viagemId, contexto, 'MESSAGE');

        return
      }
      catch(e){
        logger.error(e)
        logger.info(e.toString(), token)
        return undefined;
      }
    }

    async notificaRoteiro(token, usuarioId, viagemId, contexto, operacao){
      try{
        let titulo, mensagem, dado;

        const viagem = await this.chatRepository.buscaViagemPorId(viagemId)
        const participantes = await this.chatRepository.buscaParticipantes(viagem, usuarioId);
        const topico = await this.chatRepository.buscaTopico(contexto);
  
        switch(operacao){
          case 'MESSAGE':
            titulo = 'Você recebeu nova mensagem.'
            mensagem = 'Nova mensagem no tópico "' + topico.descricao + '" da viagem "' + viagem.descricao + '".'
            break;
        }
  
        const body = {
          icone: 'chat-bubble-outline',
          participantes: participantes,
          titulo: titulo,
          mensagem: mensagem,
          dado: {
            viagem: viagem,
            topico: topico,
          }
        }
  
        this.notifica(token, body);
      }
      catch(e){
        logger.error(e)
      	logger.info(e.toString(), token)
      }
      
    }
  
  
    async notifica(token, body) {
      await api.post("notificacoes/", body,
        {
          headers: {
            'x-access-token': token
        }
      }).then((response) => {
          //console.log('Response ' + response.data.perfis)
      }).catch((err) => {
          console.error("ops! ocorreu um erro" + err);
          return undefined;
      });
    }

    buscaUsuarioAtual(id) {
      try{
        return this.users.find(user => user.id === id);
      }
      catch(e){
        logger.error(e)
        logger.info(e.toString(), req.token)
        return undefined;
      }
      
    }

    async salvaMensagem(user, msg){
      try{
        const mensagem = await this.chatRepository.salvarMensagem(user, msg);
        return mensagem[0];
      }
      catch(e){
        logger.error(e)
        logger.info(e.toString(), req.token)
        return undefined;
      }
    }

    formataMensagem(metadata, mensagem) {
      try{
        return {
          metadata,
          mensagem,
          time: moment().format('h:mm a')
        };
      }
      catch(e){
        logger.error(e)
        logger.info(e.toString(), req.token)
        return undefined;
      }
    }

    desconectaDoChat(id){
      try{
        const index = this.users.findIndex(user => user.id === id);

        if (index !== -1) {
          return this.users.splice(index, 1)[0];
        }

      }
      catch(e){
        logger.error(e)
        logger.info(e.toString(), req.token);
      }
    }
  
    async salva(req, res){
      try{
        const {viagemId, topico} = req.body;
        const topicoObject = await this.chatRepository.buscaTopico(topico);
        
        if(!topicoObject){
          return res.status(400).json({status: '400', mensagem: 'O tópico informado não existe.'});           
        }

        const viagem = await this.buscaViagem(req, viagemId);
        if(!viagem){
          return res.status(400).json({status: '400', mensagem: 'A viagem informado não existe.'});           
        }

        const chatObject = {
          nome: topicoObject.descricao,
          topicoId: topicoObject.id,
          viagemId: viagemId
        }

        const chat = await this.chatRepository.salva(chatObject)
        let participantes = []

        viagem.participantes.map((p) => {
          participantes.push({usuarioId: p.usuarioId, chatId: chat.id});
        })

        await this.chatRepository.salvaParticipantes(participantes);

        return res.status(201).json(chatViewModel(chat));
      }
      catch(e){
        logger.error(e)
        logger.info(e.toString(), req.token)
        return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});           
      }      
    }

    async buscaViagem(req, viagemId){
      try{
        const viagem = await api.get('viagens/'+viagemId, 
          {
            headers: {
              'x-access-token': req.headers['x-access-token']
            }
          }).then((response) => {
            //console.log('Response ' + response.data.perfis)
            return response.data;
          }).catch((err) => {
              console.error("ops! ocorreu um erro" + err);
              return undefined;
          });

        return viagem;
      }
      catch(e){
        logger.error(e)
        logger.info(e.toString(), req.token)
        return undefined;
      }
    }
  
    async mostra(req, res){
      try{
        const verificar = req.query.verificar

        if(!verificar){
          const mensagens = await this.chatRepository.buscaMensagens(req.chat.id);
          req.chat.mensagens = mensagens;
        }
        
        return res.status(200).json(chatViewModel(req.chat)); 

      }
      catch(e){
        console.log(e)
        return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
      }
      
    }
  
  }