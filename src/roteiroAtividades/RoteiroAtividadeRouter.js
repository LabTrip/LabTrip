import express from 'express';
import LoginMiddleware from '../login/LoginMiddleware'
import LoginRepository from '../login/LoginRepository'
import AcessoRotaMiddleware from '../acesso_rota/AcessoRotaMiddleware'
import AcessoRotaRepository from '../acesso_rota/AcessoRotaRepository'
import RoteiroAtividadeController from './RoteiroAtividadeController'
import RoteiroAtividadeMiddleware from './RoteiroAtividadeMiddleware'
import RoteiroAtividadeRepository from './RoteiroAtividadeRepository'
import {client} from '../config'

export default function defineRoteiroAtividadeRouter(){
  const router = express.Router();

  const loginRepository = new LoginRepository(client);
  const loginMiddleware = new LoginMiddleware(loginRepository);

  const acessoRotaRepository = new AcessoRotaRepository(client)
  const acessoRotaMiddleware = new AcessoRotaMiddleware(acessoRotaRepository)

  const roteiroAtividadeRepository = new RoteiroAtividadeRepository(client);
  const roteiroAtividadeController = new RoteiroAtividadeController(roteiroAtividadeRepository);
  const roteiroAtividadeMiddleware = new RoteiroAtividadeMiddleware(roteiroAtividadeRepository);

  router.route('/')
   .all((req, res, next) => loginMiddleware.validaToken(req,res, next))
   .all((req, res, next) => acessoRotaMiddleware.acessoRota(req, res, next))
   .all((req, res, next) => roteiroAtividadeMiddleware.roteiroAtividadeExiste(req, res, next))  
   .get((req, res) => roteiroAtividadeController.buscaTodos(req, res))
   .post((req, res) => roteiroAtividadeController.salva(req, res));

  router.route('/:atividadeId/:roteiroId/:versaoRoteiro')
    .all((req, res, next) => loginMiddleware.validaToken(req,res, next))
    .all((req, res, next) => acessoRotaMiddleware.acessoRota(req, res, next))
    .all((req, res, next) => roteiroAtividadeMiddleware.roteiroAtividadeExiste(req, res, next))  
    .get((req, res) => roteiroAtividadeController.mostra(req, res))
    .put((req, res) => roteiroAtividadeController.atualiza(req, res))
    .delete((req, res) => roteiroAtividadeController.deleta(req, res));


  return router;
}