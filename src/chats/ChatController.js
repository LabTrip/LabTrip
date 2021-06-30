import Chat from './Chat'
const moment = require('moment')
import api from '../requesterConfig'

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
        return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
      }
      
    }

    conectaAoChat(id, username, userId, room, chat) {
      try{
        const user = { id, username, userId, room , chat};

        this.users.push(user);

        return user;
      }
      catch(e){
        console.log(e)
        return undefined;
      }
      
    }

    buscaUsuariosDaSala(room) {
      try{
        return this.users.filter(user => user.room === room);
      }
      catch(e){
        console.log(e)
        return undefined;
      }
      
    }

    buscaUsuarioAtual(id) {
      try{
        return this.users.find(user => user.id === id);
      }
      catch(e){
        console.log(e)
        return undefined;
      }
      
    }

    async salvaMensagem(user, msg){
      try{
        const mensagem = await this.chatRepository.salvarMensagem(user, msg);
        return mensagem[0];
      }
      catch(e){
        console.log(e)
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
        console.log(e)
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
        console.log(e);
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
        console.log(e)
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
        console.log(e)
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