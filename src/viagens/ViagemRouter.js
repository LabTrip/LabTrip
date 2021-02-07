import express from 'express';
import ViagemController from './ViagemController'
import ViagemMiddleware from './ViagemMiddleware'
import ViagemRepository from './ViagemRepository'
import LoginMiddleware from '../login/LoginMiddleware'
import LoginRepository from '../login/LoginRepository'
import {client} from '../config'

export default function defineViagemRouter(){
  const router = express.Router();

  const viagemRepository = new ViagemRepository(client);

  const viagemController = new ViagemController(viagemRepository);
  const viagemMiddleware = new ViagemMiddleware(viagemRepository);

  const loginRepository = new LoginRepository(client);
  const loginMiddleware = new LoginMiddleware(loginRepository);

  router.route('/')
   .all((req, res, next) => loginMiddleware.validaToken(req,res, next))
   .get((req, res) => viagemController.buscaTodos(req, res))
   .post((req, res) => viagemController.salva(req, res));

  router.route('/:id')
    .all((req, res, next) => loginMiddleware.validaToken(req,res, next))
    .all((req, res, next) => viagemMiddleware.viagemExiste(req, res, next))
    .get((req, res) => viagemController.mostra(req, res))
    .put((req, res) => viagemController.atualiza(req, res))
    .delete((req, res) => viagemController.deleta(req, res));

  return router;
}