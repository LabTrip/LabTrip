import express from 'express';
import LoginMiddleware from '../login/LoginMiddleware'
import LoginRepository from '../login/LoginRepository'
import AcessoRotaMiddleware from '../acesso_rota/AcessoRotaMiddleware'
import AcessoRotaRepository from '../acesso_rota/AcessoRotaRepository'
import ListaContatosController from './ListaContatosController'
import ListaContatosRepository from './ListaContatosRepository'
import ListaContatosMiddleware from './ListaContatosMiddleware'
import UsuarioMiddleware from '../usuarios/UsuarioMiddleware'
import UsuarioRepository from '../usuarios/UsuarioRepository'
import {client} from '../config'

export default function defineListaContatosRouter(){
  const router = express.Router();

  const loginRepository = new LoginRepository(client);
  const loginMiddleware = new LoginMiddleware(loginRepository);

  const acessoRotaRepository = new AcessoRotaRepository(client)
  const acessoRotaMiddleware = new AcessoRotaMiddleware(acessoRotaRepository)

  const usuarioRepository = new UsuarioRepository(client);
  const usuarioMiddleware = new UsuarioMiddleware(usuarioRepository);
  
  const listaContatosRepository = new ListaContatosRepository(client);
  const listaContatosController = new ListaContatosController(listaContatosRepository);
  const listaContatosMiddleware = new ListaContatosMiddleware(listaContatosRepository)


  router.route('/')
   .all((req, res, next) => loginMiddleware.validaToken(req,res, next))
   .all((req, res, next) => acessoRotaMiddleware.acessoRota(req, res, next))
   .get((req, res) => listaContatosController.buscaTodos(req, res))
   .post((req, res) => listaContatosController.salva(req, res));

  router.route('/:usuarioId/:contatoId')
    .all((req, res, next) => loginMiddleware.validaToken(req,res, next))
    .all((req, res, next) => acessoRotaMiddleware.acessoRota(req, res, next))
    .all((req, res, next) => listaContatosMiddleware.contatoExiste(req, res, next))    
    .get((req, res) => listaContatosController.mostra(req, res))
    .put((req, res) => listaContatosController.atualiza(req, res))
    .delete((req, res) => listaContatosController.deleta(req, res));

  router.route('/:usuarioId')  
    .all((req, res, next) => loginMiddleware.validaToken(req,res, next))
    .all((req, res, next) => acessoRotaMiddleware.acessoRota(req, res, next))
    .get((req, res) => listaContatosController.buscaTodosPorUsuario(req, res))

  return router;
}