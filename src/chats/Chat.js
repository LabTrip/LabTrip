
import {client} from '../config'
import ChatController from './ChatController'
import ChatMiddleware from './ChatMiddleware'
import ChatRepository from './ChatRepository'

export default class Chat {

  constructor(io){
    this.chatRepository = new ChatRepository(client);
    this.chatController = new ChatController(this.chatRepository);
    this.chatMiddleware = new ChatMiddleware(this.chatRepository);
    this.io = io;
  }
  users = [];
  
  connection(socket) {
    //console.log('conectou')
    socket.on('joinRoom', async ({ token, room }) => {
      //console.log('join')
      const userAuth = await this.chatMiddleware.autentica(token);
      if(!userAuth){
        socket.emit('message', this.chatController.formataMensagem('Labtrip', 'Você precisa se identificar antes de participar deste chat.'));
        return
      }
      const chat = await this.chatMiddleware.buscaChat(token, room);
      if(!chat){
        socket.emit('message', this.chatController.formataMensagem({enviadoPor: 'Labtrip', usuarioId: '0'}, 'O chat informado não existe.'));
        return
      }
      const user = this.chatController.conectaAoChat(socket.id, userAuth.nome, userAuth.id, room, chat);
  
      socket.join(user.room);
      //console.log(user)
      // Welcome current user
      if(chat.mensagens && chat.mensagens.length > 0){
        const messages = chat.mensagens.map((m) => this.chatController.formataMensagem({enviadoPor: m.enviadoPor, usuarioId: m.usuarioId, id: m.id}, m.mensagem));
        socket.emit('messages', messages);
      }
      else{
        socket.emit('messages', []);
      }
  
    });
  
    // Listen for chatMessage
    socket.on('chatMessage', async (msg) => {
      const user = this.chatController.buscaUsuarioAtual(socket.id);

      const mensagem = await this.chatController.salvaMensagem(user, msg);
      if(!mensagem){
        socket.emit('message', this.chatController.formataMensagem({enviadoPor: 'Labtrip', usuarioId: '0'}, 'Não foi possível enviar sua mensagem.'));
        return
      }
      //console.log(mensagem)
      this.io.to(user.room).emit('message', this.chatController.formataMensagem({enviadoPor: user.username, usuarioId: user.userId, id: mensagem.id}, msg));
    });
  
    // Runs when client disconnects
    socket.on('disconnect', () => {
      const user = this.chatController.desconectaDoChat(socket.id);
    });
  }
}