import express from 'express';
import ViagemController from './ViagemController'
import ViagemMiddleware from './ViagemMiddleware'
import ViagemRepository from './ViagemRepository'
import LoginMiddleware from '../login/LoginMiddleware'
import LoginRepository from '../login/LoginRepository'
import AcessoRotaMiddleware from '../acesso_rota/AcessoRotaMiddleware'
import AcessoRotaRepository from '../acesso_rota/AcessoRotaRepository'
import {client} from '../config'

export default function defineViagemRouter(){
  const router = express.Router();

  const viagemRepository = new ViagemRepository(client);

  const viagemController = new ViagemController(viagemRepository);
  const viagemMiddleware = new ViagemMiddleware(viagemRepository);

  const loginRepository = new LoginRepository(client);
  const loginMiddleware = new LoginMiddleware(loginRepository);

  const acessoRotaRepository = new AcessoRotaRepository(client)
  const acessoRotaMiddleware = new AcessoRotaMiddleware(acessoRotaRepository)

  router.route('/')
   .all((req, res, next) => loginMiddleware.validaToken(req,res, next))
   .all((req, res, next) => acessoRotaMiddleware.acessoRota(req, res, next))
   .get((req, res) => viagemController.buscaTodos(req, res))
   .post((req, res) => viagemController.salva(req, res));

  router.route('/permissoes-viagem/:id')
   .all((req, res, next) => loginMiddleware.validaToken(req,res, next))
   .all((req, res, next) => acessoRotaMiddleware.acessoRota(req, res, next))
   .all((req, res, next) => viagemMiddleware.viagemExiste(req, res, next))
   .get((req, res) => viagemController.buscaPermissoes(req, res))

   router.route('/filtraviagens')
   .all((req, res, next) => loginMiddleware.validaToken(req,res, next))
   .post((req, res) => viagemController.buscaComFiltro(req, res));

  router.route('/:id')
    .all((req, res, next) => loginMiddleware.validaToken(req,res, next))
    .all((req, res, next) => acessoRotaMiddleware.acessoRota(req, res, next))
    .all((req, res, next) => viagemMiddleware.viagemExiste(req, res, next))
    .get((req, res) => viagemController.mostra(req, res))
    .put((req, res) => viagemController.atualiza(req, res))
    .delete((req, res) => viagemController.deleta(req, res));

  router.route('/participantes/:id')
    .all((req, res, next) => loginMiddleware.validaToken(req,res, next))
    .all((req, res, next) => acessoRotaMiddleware.acessoRota(req, res, next))
    .all((req, res, next) => viagemMiddleware.viagemExiste(req, res, next))
    .get((req, res) => viagemController.buscaParticipantes(req, res))
    .post((req, res) => viagemController.convidaParticipantes(req, res))
    .put((req, res) => viagemController.atualizaParticipantes(req, res))
    .delete((req, res) => viagemController.deletaParticipantes(req, res));

    router.route('/aceitar-convite/:convite')
    .get((req, res) => viagemController.salvaParticipante(req, res))
    

  return router;
}