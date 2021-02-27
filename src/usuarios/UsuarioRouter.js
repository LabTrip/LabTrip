import express from 'express';
import UsuarioController from './UsuarioController'
import UsuarioMiddleware from './UsuarioMiddleware'
import UsuarioRepository from './UsuarioRepository'
import LoginMiddleware from '../login/LoginMiddleware'
import LoginRepository from '../login/LoginRepository'
import PerfilMiddleware from '../perfis/PerfilMiddleware'
import PerfilRepository from '../perfis/PerfilRepository'
import AcessoRotaMiddleware from '../acesso_rota/AcessoRotaMiddleware'
import AcessoRotaRepository from '../acesso_rota/AcessoRotaRepository'
import {client} from '../config'

export default function defineUsuarioRouter(){
  const router = express.Router();

  const usuarioRepository = new UsuarioRepository(client);

  const usuarioController = new UsuarioController(usuarioRepository);
  const usuarioMiddleware = new UsuarioMiddleware(usuarioRepository);

  const loginRepository = new LoginRepository(client);
  const loginMiddleware = new LoginMiddleware(loginRepository);

  const perfilRepository = new PerfilRepository(client);
  const perfilMiddleware = new PerfilMiddleware(perfilRepository);

  const acessoRotaRepository = new AcessoRotaRepository(client);
  const acessoRotaMiddleware = new AcessoRotaMiddleware(acessoRotaRepository);

  router.route('/')
   .all((req, res, next) => loginMiddleware.validaToken(req,res, next))
   .all((req, res, next) => acessoRotaMiddleware.acessoRota(req, res, next))
   .get((req, res) => usuarioController.buscaTodos(req, res))
   .all((req, res, next) => usuarioMiddleware.verificaUsuarioJaCadastrado(req, res, next))
   .post((req, res) => usuarioController.salva(req, res));

  router.route('/:id')
    .all((req, res, next) => loginMiddleware.validaToken(req,res, next))
    .all((req, res, next) => acessoRotaMiddleware.acessoRota(req, res, next))
    .all((req, res, next) => usuarioMiddleware.usuarioExiste(req, res, next))
    .get((req, res) => usuarioController.mostra(req, res))
    .put((req, res) => usuarioController.atualiza(req, res))
    .delete((req, res) => usuarioController.deleta(req, res));

    router.route('/redefine-senha/:id')
    .all((req, res, next) => loginMiddleware.validaToken(req,res, next))
    .all((req, res, next) => acessoRotaMiddleware.acessoRota(req, res, next))
    .all((req, res, next) => usuarioMiddleware.usuarioExiste(req, res, next))
    .put((req, res) => usuarioController.atualizaSenha(req, res));

  return router;
}