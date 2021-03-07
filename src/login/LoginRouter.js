import express from 'express';
import LoginController from './LoginController'
import LoginMiddleware from './LoginMiddleware'
import LoginRepository from './LoginRepository'
import {client} from '../config'

export default function defineLoginRouter(){
  const router = express.Router();

  const loginRepository = new LoginRepository(client);
  const loginController = new LoginController(loginRepository);
  const loginMiddleware = new LoginMiddleware(loginRepository);

  router.route('/')
   .all((req, res, next) => loginMiddleware.usuarioExiste(req, res, next))
   .post((req, res) => loginController.autentica(req, res));

   router.route('/verifica')
   .post((req, res) => loginController.validaSessao(req, res));

  router.route('/redefine')
   .all((req, res, next) => loginMiddleware.usuarioExiste(req, res, next))
   .post((req, res) => loginController.redefine(req, res));

   router.route('/alterarSenha/:id')
   .all((req, res, next) => loginMiddleware.validaToken(req,res, next))
   .all((req, res, next) => loginMiddleware.usuarioExisteAlterarSenha(req, res, next))
   .post((req, res) => loginController.alterarSenha(req, res));
  
   router.route('/geracodigo')
   .all((req, res, next) => loginMiddleware.usuarioExiste(req, res, next))
   .post((req, res) => loginController.geraCodigo(req, res));

   router.route('/verificacodigo')
   .all((req, res, next) => loginMiddleware.usuarioExiste(req, res, next))
   .post((req, res) => loginController.validaCodigo(req, res));

  return router;
}