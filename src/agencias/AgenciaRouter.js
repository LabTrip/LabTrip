import express from 'express';
import AgenciaController from './AgenciaController'
import AgenciaMiddleware from './AgenciaMiddleware'
import AgenciaRepository from './AgenciaRepository'
import {client} from '../config'

export default function defineAgenciaRouter(){
  const router = express.Router();

  const agenciaRepository = new AgenciaRepository(client);

  const agenciaController = new AgenciaController(agenciaRepository);
  const agenciaMiddleware = new AgenciaMiddleware(agenciaRepository);

  router.route('/')
   .get((req, res) => agenciaController.index(req, res))
   .post((req, res) => agenciaController.save(req, res));

  router.route('/:ID')
    .all((req, res, next) => agenciaMiddleware.agenciaExiste(req, res, next))
    .get((req, res) => agenciaController.show(req, res))
    .put((req, res) => agenciaController.update(req, res))
    .delete((req, res) => agenciaController.delete(req, res));

  return router;
}