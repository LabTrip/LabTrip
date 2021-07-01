import express from 'express';
import NotificacaoController from './NotificacaoController'
import NotificacaoMiddleware from './NotificacaoMiddleware'
import NotificacaoRepository from './NotificacaoRepository'
import LoginMiddleware from '../login/LoginMiddleware'
import LoginRepository from '../login/LoginRepository'
import AcessoRotaMiddleware from '../acesso_rota/AcessoRotaMiddleware'
import AcessoRotaRepository from '../acesso_rota/AcessoRotaRepository'
import {client} from '../config'
const multer = require("multer");
const multerConfig = require("../config/multer");

export default function defineUsuarioRouter(){
  const router = express.Router();

  const notificacaoRepository = new NotificacaoRepository(client);

  const notificacaoController = new NotificacaoController(notificacaoRepository);
  const notificacaoMiddleware = new NotificacaoMiddleware(notificacaoRepository);

  const loginRepository = new LoginRepository(client);
  const loginMiddleware = new LoginMiddleware(loginRepository);

  const acessoRotaRepository = new AcessoRotaRepository(client);
  const acessoRotaMiddleware = new AcessoRotaMiddleware(acessoRotaRepository);

  router.route('/')
   .all((req, res, next) => loginMiddleware.validaToken(req,res, next))
   .get((req, res) => notificacaoController.mostraNotificacoes(req, res))
   .post((req, res) => notificacaoController.notifica(req, res));

  return router;
}