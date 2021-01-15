import express from 'express';
import ViagemController from './ViagemController'
import ViagemMiddleware from './ViagemMiddleware'
import ViagemRepository from './ViagemRepository'
import {client} from '../config'

export default function defineViagemRouter(){
  const router = express.Router();

  const viagemRepository = new ViagemRepository(client);

  const viagemController = new ViagemController(viagemRepository);
  const viagemMiddleware = new ViagemMiddleware(viagemRepository);

  router.route('/')
   .get((req, res) => viagemController.index(req, res))
   .post((req, res) => viagemController.save(req, res));

  router.route('/:tripId')
    .all((req, res, next) => viagemMiddleware.viagemExiste(req, res, next))
    .get((req, res) => viagemController.show(req, res))
    .put((req, res) => viagemController.update(req, res))
    .delete((req, res) => viagemController.delete(req, res));

  return router;
}