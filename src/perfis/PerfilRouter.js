import express from 'express';
import PerfilController from './PerfilController'
import PerfilMiddleware from './PerfilMiddleware'
import PerfilRepository from './PerfilRepository'
import {client} from '../config'

export default function defineAgenciaRouter(){
  const router = express.Router();

  const perfilRepository = new PerfilRepository(client);

  const perfilController = new PerfilController(perfilRepository);
  const perfilMiddleware = new AgenciaMiddleware(perfilRepository);

  router.route('/')
   .get((req, res) => agenciaController.buscaTodos(req, res))
   .post((req, res) => agenciaController.salva(req, res));

  router.route('/:id')
    .all((req, res, next) => perfilMiddleware.perfilExiste(req, res, next))
    .get((req, res) => agenciaController.mostra(req, res));

  return router;
}