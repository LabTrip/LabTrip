import express, { Router } from 'express';
import cors from 'cors';
import defineUsuarioRouter from './usuarios/UsuarioRouter'
import defineViagemRouter from './viagens/ViagemRouter'
import defineAtividadeRouter from './atividades/AtividadeRouter'
import defineAgenciaRouter from './agencias/AgenciaRouter'
import defineLoginRouter from './login/LoginRouter'
import definePerfilRouter from './perfis/PerfilRouter'
import defineLocalRouter from './locais/LocalRouter'
import defineRoteiroRouter from './roteiros/RoteiroRouter'
import defineRoteiroAtividadeRouter from './roteiroAtividades/RoteiroAtividadeRouter'
import defineVotacaoRouter from './votacoes/VotacaoRouter'
import defineDadosEssenciaisRouter from './dadosEssenciais/DadosEssenciaisRouter'
import defineListaContatosRouter from './listaContatos/ListaContatosRouter'
import defineChatRouter from './chats/ChatRouter'
import defineOrcamentoRouter from './orcamentos/OrcamentoRouter'
import definePublicRouter from './public/PublicRouter'
import defineNotificacaoRouter from './notificacoes/NotificacaoRouter'
import Chat from './chats/Chat'

const http = require('http')
const socketio =  require('socket.io');
const path = require("path");
var helmet = require('helmet');
var httpsRedirect = require('express-https-redirect');

export default function LabTrip() {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/', httpsRedirect());
  app.use(helmet());
  app.use(cors());
  app.use('/usuarios', defineUsuarioRouter());
  app.use('/viagens', defineViagemRouter());
  app.use('/atividades', defineAtividadeRouter());
  app.use('/agencias', defineAgenciaRouter());
  app.use('/login', defineLoginRouter());
  app.use('/perfis', definePerfilRouter());
  app.use('/locais', defineLocalRouter());
  app.use('/roteiros', defineRoteiroRouter());
  app.use('/roteiroAtividades', defineRoteiroAtividadeRouter());
  app.use('/votacoes', defineVotacaoRouter());
  app.use('/dadosEssenciais', defineDadosEssenciaisRouter());
  app.use('/listaContatos', defineListaContatosRouter());
  app.use('/chats', defineChatRouter());
  app.use('/orcamentos', defineOrcamentoRouter());
  app.use('/public', definePublicRouter());
  app.use('/notificacoes', defineNotificacaoRouter());
  app.use(
    "/files",
    express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
  );

  app.get('/', function(req, res) {
    res.status(200).json({mensagem: 'Olá  mundo!'});
  });

  /*app.listen(process.env.PORT || 5001, function(){
    console.log('Hello!');
  });*/

  /** Create HTTP server. */
  const server = http.createServer(app);
  /** Create socket connection */
  const io = socketio().listen(server);
  io.on('connection', socket => {
    console.log('Alou')
    socket.on('joinRoom', ({ username, room }) => {
      console.log('deu join')
      const user = userJoin(socket.id, username, room);
  
      socket.join(user.room);
  
      // Welcome current user
      socket.emit('message', formatMessage(botName, 'Welcome to ChatCord!'));
  
      // Broadcast when a user connects
      socket.broadcast
        .to(user.room)
        .emit(
          'message',
          formatMessage(botName, `${user.username} has joined the chat`)
        );
  
      // Send users and room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    });
  
    // Listen for chatMessage
    socket.on('chatMessage', msg => {
      const user = getCurrentUser(socket.id);
  
      io.to(user.room).emit('message', formatMessage(user.username, msg));
    });
  
    // Runs when client disconnects
    socket.on('disconnect', () => {
      
    });
  })

  server.listen(process.env.PORT || 5001, function(){
    console.log('Hello!');
  })
  
  return app;
}