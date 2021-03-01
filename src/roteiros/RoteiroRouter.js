import express from 'express';
import LoginMiddleware from '../login/LoginMiddleware'
import LoginRepository from '../login/LoginRepository'
import AcessoRotaMiddleware from '../acesso_rota/AcessoRotaMiddleware'
import AcessoRotaRepository from '../acesso_rota/AcessoRotaRepository'
import RoteiroController from './RoteiroController'
import RoteiroMiddleware from './RoteiroMiddleware'
import RoteiroRepository from './RoteiroRepository'
import {client} from '../config'

export default function defineRoteiroRouter(){
  const router = express.Router();

  const loginRepository = new LoginRepository(client);
  const loginMiddleware = new LoginMiddleware(loginRepository);

  const acessoRotaRepository = new AcessoRotaRepository(client)
  const acessoRotaMiddleware = new AcessoRotaMiddleware(acessoRotaRepository)

  const roteiroRepository = new RoteiroRepository(client);
  const roteiroController = new RoteiroController(roteiroRepository);
  const roteiroMiddleware = new RoteiroMiddleware(roteiroRepository);

  router.route('/')
   .all((req, res, next) => loginMiddleware.validaToken(req,res, next))
   .all((req, res, next) => acessoRotaMiddleware.acessoRota(req, res, next))
   .all((req, res, next) => roteiroMiddleware.roteiroExiste(req, res, next))  
   .get((req, res) => roteiroController.buscaTodos(req, res))
   .post((req, res) => roteiroController.salva(req, res));

  router.route('/:viagemId/:versao')
    .all((req, res, next) => loginMiddleware.validaToken(req,res, next))
    .all((req, res, next) => acessoRotaMiddleware.acessoRota(req, res, next))
    .all((req, res, next) => roteiroMiddleware.roteiroExiste(req, res, next))  
    .get((req, res) => roteiroController.mostra(req, res))
    .put((req, res) => roteiroController.atualiza(req, res))
    .delete((req, res) => roteiroController.deleta(req, res));

  router.route('/:viagemId')
    .all((req, res, next) => loginMiddleware.validaToken(req,res, next))
    .all((req, res, next) => acessoRotaMiddleware.acessoRota(req, res, next))
    .all((req, res, next) => roteiroMiddleware.roteiroExiste(req, res, next))  
    .get((req, res) => roteiroController.mostra(req, res))
    .put((req, res) => roteiroController.atualiza(req, res))
    .delete((req, res) => roteiroController.deleta(req, res));

  return router;
}