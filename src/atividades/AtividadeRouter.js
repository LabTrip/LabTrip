import express from 'express';
import AtividadeController from './AtividadeController'
import AtividadeMiddleware from './AtividadeMiddleware'
import AtividadeRepository from './AtividadeRepository'
import LoginMiddleware from '../login/LoginMiddleware'
import LoginRepository from '../login/LoginRepository'
import AcessoRotaMiddleware from '../acesso_rota/AcessoRotaMiddleware'
import AcessoRotaRepository from '../acesso_rota/AcessoRotaRepository'
import {client} from '../config'

export default function defineAtividadeRouter(){
  const router = express.Router();

  const atividadeRepository = new AtividadeRepository(client);
  const atividadeController = new AtividadeController(atividadeRepository);
  const atividadeMiddleware = new AtividadeMiddleware(atividadeRepository);

  const loginRepository = new LoginRepository(client);
  const loginMiddleware = new LoginMiddleware(loginRepository);

  const acessoRotaRepository = new AcessoRotaRepository(client)
  const acessoRotaMiddleware = new AcessoRotaMiddleware(acessoRotaRepository)

  router.route('/')
   .all((req, res, next) => loginMiddleware.validaToken(req,res, next))
   .all((req, res, next) => acessoRotaMiddleware.acessoRota(req, res, next))
   .get((req, res) => atividadeController.buscaTodos(req, res))
   .post((req, res) => atividadeController.salva(req, res));

  router.route('/:id')
    .all((req, res, next) => loginMiddleware.validaToken(req,res, next))
    .all((req, res, next) => acessoRotaMiddleware.acessoRota(req, res, next))
    .all((req, res, next) => atividadeMiddleware.atividadeExiste(req, res, next))
    .get((req, res) => atividadeController.mostra(req, res))
    .put((req, res) => atividadeController.atualiza(req, res))
    .delete((req, res) => atividadeController.deleta(req, res));

  return router;
}