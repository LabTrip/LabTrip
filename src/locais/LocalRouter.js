import express from 'express';
import LocalController from './LocalController'
import LocalMiddleware from './LocalMiddleware'
import LocalRepository from './LocalRepository'
import LoginMiddleware from '../login/LoginMiddleware'
import LoginRepository from '../login/LoginRepository'
import {client} from '../config'

export default function defineLocalRouter(){
  const router = express.Router();

  const localRepository = new LocalRepository(client);
  const localController = new LocalController(localRepository);
  const localMiddleware = new LocalMiddleware(localRepository);

  const loginRepository = new LoginRepository(client);
  const loginMiddleware = new LoginMiddleware(loginRepository);

  router.route('/')
   .all((req, res, next) => loginMiddleware.validaToken(req,res, next))
   .get((req, res) => localController.buscaTodos(req, res))
   .post((req, res) => localController.salva(req, res));

  router.route('/:id')
    .all((req, res, next) => loginMiddleware.validaToken(req,res, next))
    .all((req, res, next) => localMiddleware.atividadeExiste(req, res, next))
    .get((req, res) => localController.mostra(req, res))
    .put((req, res) => localController.atualiza(req, res))
    .delete((req, res) => localController.deleta(req, res));

  return router;
}