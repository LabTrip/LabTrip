import express from 'express';
import PerfilController from './PerfilController'
import PerfilMiddleware from './PerfilMiddleware'
import PerfilRepository from './PerfilRepository'
import LoginMiddleware from '../login/LoginMiddleware'
import LoginRepository from '../login/LoginRepository'
import {client} from '../config'

export default function defineAgenciaRouter(){
  const router = express.Router();

  const perfilRepository = new PerfilRepository(client);

  const perfilController = new PerfilController(perfilRepository);
  const perfilMiddleware = new PerfilMiddleware(perfilRepository);

  const loginRepository = new LoginRepository(client);
  const loginMiddleware = new LoginMiddleware(loginRepository);

  router.route('/')
   .all((req, res, next) => loginMiddleware.validaToken(req,res, next))
   .get((req, res) => perfilController.buscaTodos(req, res))
   .post((req, res) => perfilController.salva(req, res));

  router.route('/:id')
    .all((req, res, next) => loginMiddleware.validaToken(req,res, next))
    .all((req, res, next) => perfilMiddleware.perfilExiste(req, res, next))
    .get((req, res) => perfilController.mostra(req, res));

  return router;
}