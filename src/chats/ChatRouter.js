import express from 'express';
import LoginMiddleware from '../login/LoginMiddleware'
import LoginRepository from '../login/LoginRepository'
import AcessoRotaMiddleware from '../acesso_rota/AcessoRotaMiddleware'
import AcessoRotaRepository from '../acesso_rota/AcessoRotaRepository'
import ChatController from './ChatController'
import ChatRepository from './ChatRepository'
import ChatMiddleware from './ChatMiddleware'
import {client} from '../config'

export default function defineChatRouter(expressWs){
  const router = express.Router();

  const loginRepository = new LoginRepository(client);
  const loginMiddleware = new LoginMiddleware(loginRepository);

  const acessoRotaRepository = new AcessoRotaRepository(client)
  const acessoRotaMiddleware = new AcessoRotaMiddleware(acessoRotaRepository)
  
  const chatRepository = new ChatRepository(client);
  const chatController = new ChatController(chatRepository);
  const chatMiddleware = new ChatMiddleware(chatRepository);


  router.route('/')
   .all((req, res, next) => loginMiddleware.validaToken(req,res, next))
   .all((req, res, next) => acessoRotaMiddleware.acessoRota(req, res, next))
   .get((req, res) => chatController.buscaTodos(req, res))
   .post((req, res) => chatController.salva(req, res));

  router.route('/:chatId')
    .all((req, res, next) => loginMiddleware.validaToken(req,res, next))
    .all((req, res, next) => acessoRotaMiddleware.acessoRota(req, res, next))
    .all((req, res, next) => chatMiddleware.chatExiste(req, res, next))    
    .get((req, res) => chatController.mostra(req, res))
    .put((req, res) => chatController.atualiza(req, res))
    .delete((req, res) => chatController.deleta(req, res));

  return router; 
}