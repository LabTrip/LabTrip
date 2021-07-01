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
import {v4 as uuidv4} from 'uuid';

const http = require('http')
const socketio =  require('socket.io');
const path = require("path");
var helmet = require('helmet');
var httpsRedirect = require('express-https-redirect');

const morgan = require('morgan')
const json = require('morgan-json');
var rfs = require('rotating-file-stream')

// create a rotating write stream
var accessLogStream = rfs.createStream('access.log', {
  interval: '1d', // rotate daily
  size: "10M",  
  path: path.join(__dirname, "./logs")
})

morgan.token('bodyJSON', req => JSON.stringify(req.body || {}));
morgan.token('token', req => JSON.stringify(req.token));

const formatLog = json({
  data: ':date[clf]',
  token: ':token',
  request: ':method :url HTTP/:http-version',
  status: ':status',
  res: ':res[content-length]',
  responseTime: ':response-time ms',
  body: ':bodyJSON'
});

//const formatLog2 = json(':date[clf] :user-id :method :url HTTP/:http-version :status :res[content-length] :response-time ms :bodyJSON')

export default function LabTrip() {
  const app = express();
  app.use(express.json());
  app.use(morgan(formatLog,{ stream: accessLogStream }));  
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
  const chat = new Chat(io);
  io.on('connection', socket => chat.connection(socket))

  server.listen(process.env.PORT || 5001, function(){
    console.log('Hello!');
  })
  
  return app;
}