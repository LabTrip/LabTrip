import express from 'express';
import RoteiroController from './RoteiroController'
import RoteiroMiddleware from './RoteiroMiddleware'
import RoteiroRepository from './RoteiroRepository'
import {client} from '../config'

export default function defineRoteiroRouter(){
  const router = express.Router();

  const roteiroRepository = new RoteiroRepository(client);
  const roteiroController = new RoteiroController(roteiroRepository);
  const roteiroMiddleware = new RoteiroMiddleware(roteiroRepository);

  router.route('/')
   .get((req, res) => roteiroController.index(req, res))
   .post((req, res) => roteiroController.salva(req, res));

  router.route('/:Id')
    .all((req, res, next) => roteiroMiddleware.roteiroExiste(req, res, next))
    .get((req, res) => roteiroController.mostra(req, res))
    .put((req, res) => roteiroController.atualiza(req, res))
    .delete((req, res) => roteiroController.deleta(req, res));

    router.route('/:Id/:ViagemId/:Versao')
    .all((req, res, next) => roteiroMiddleware.roteiroExiste(req, res, next))
    .get((req, res) => roteiroController.mostra(req, res))
    .put((req, res) => roteiroController.atualiza(req, res))
    .delete((req, res) => roteiroController.deleta(req, res));

  return router;
}