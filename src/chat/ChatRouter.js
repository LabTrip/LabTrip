import express from 'express';
import ChatController from './ChatController'
import ChatMiddleware from './ChatMiddleware'
import ChatRepository from './ChatRepository'
import LoginMiddleware from '../login/LoginMiddleware'
import LoginRepository from '../login/LoginRepository'
import {client} from '../config'

export default function defineViagemRouter(){
  const router = express.Router();

  const chatRepository = new ChatRepository(client);

  const chatController = new ChatController(chatRepository);
  const chatMiddleware = new ChatMiddleware(chatRepository);

  const loginRepository = new LoginRepository(client);
  const loginMiddleware = new LoginMiddleware(loginRepository);

  const acessoRotaRepository = new AcessoRotaRepository(client)
  const acessoRotaMiddleware = new AcessoRotaMiddleware(acessoRotaRepository)

  router.route('/:viagemId/:contexto')
   .all((req, res, next) => loginMiddleware.validaToken(req,res, next))
   .all((req, res, next) => chatMiddleware.viagemExiste(req, res, next))
   .get((req, res) => chatController.conectaAoChat(req, res));

  return router;
}