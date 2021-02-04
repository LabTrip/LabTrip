import express from 'express';
import UsuarioController from './UsuarioController'
import UsuarioMiddleware from './UsuarioMiddleware'
import UsuarioRepository from './UsuarioRepository'
import LoginMiddleware from '../login/LoginMiddleware'
import LoginRepository from '../login/LoginRepository'
import {client} from '../config'

export default function defineUsuarioRouter(){
  const router = express.Router();

  const usuarioRepository = new UsuarioRepository(client);

  const usuarioController = new UsuarioController(usuarioRepository);
  const usuarioMiddleware = new UsuarioMiddleware(usuarioRepository);

  const loginRepository = new LoginRepository(client);
  const loginMiddleware = new LoginMiddleware(loginRepository);

  router.route('/')
   .all((req, res, next) => loginMiddleware.validaToken(req,res, next))
   .get((req, res) => usuarioController.buscaTodos(req, res))
   .post((req, res) => usuarioController.salva(req, res));

  router.route('/:id')
    .all((req, res, next) => loginMiddleware.validaToken(req,res, next))
    .all((req, res, next) => usuarioMiddleware.usuarioExiste(req, res, next))
    .get((req, res) => usuarioController.mostra(req, res))
    .put((req, res) => usuarioController.atualiza(req, res))
    .delete((req, res) => usuarioController.deleta(req, res));

  return router;
}