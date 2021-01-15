import express from 'express';
import AtividadeController from './AtividadeController'
import AtividadeMiddleware from './AtividadeMiddleware'
import AtividadeRepository from './AtividadeRepository'
import {client} from '../config'

export default function defineAtividadeRouter(){
  const router = express.Router();

  const atividadeRepository = new AtividadeRepository(client);
  const atividadeController = new AtividadeController(atividadeRepository);
  const atividadeMiddleware = new AtividadeMiddleware(atividadeRepository);

  router.route('/')
   .get((req, res) => atividadeController.index(req, res))
   .post((req, res) => atividadeController.save(req, res));

  router.route('/:atividadeId')
    .all((req, res, next) => atividadeMiddleware.atividadeExiste(req, res, next))
    .get((req, res) => atividadeController.show(req, res))
    .put((req, res) => atividadeController.update(req, res))
    .delete((req, res) => atividadeController.delete(req, res));

  return router;
}