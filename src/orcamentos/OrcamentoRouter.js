import express from 'express';
import OrcamentoController from './OrcamentoController'
import OrcamentoMiddleware from './OrcamentoMiddleware'
import OrcamentoRepository from './OrcamentoRepository'
import LoginMiddleware from '../login/LoginMiddleware'
import LoginRepository from '../login/LoginRepository'
import AcessoRotaMiddleware from '../acesso_rota/AcessoRotaMiddleware'
import AcessoRotaRepository from '../acesso_rota/AcessoRotaRepository'
import {client} from '../config'

export default function defineOrcamentoRouter(){
  const router = express.Router();

  const orcamentoRepository = new OrcamentoRepository(client);

  const orcamentoController = new OrcamentoController(orcamentoRepository);
  const orcamentoMiddleware = new OrcamentoMiddleware(orcamentoRepository);

  const loginRepository = new LoginRepository(client);
  const loginMiddleware = new LoginMiddleware(loginRepository);

  const acessoRotaRepository = new AcessoRotaRepository(client)
  const acessoRotaMiddleware = new AcessoRotaMiddleware(acessoRotaRepository)

  router.route('/')
   .all((req, res, next) => loginMiddleware.validaToken(req,res, next))
   .all((req, res, next) => acessoRotaMiddleware.acessoRota(req, res, next))
   .post((req, res) => orcamentoController.salva(req, res));

    router.route('/despesaExtra')
    .all((req, res, next) => loginMiddleware.validaToken(req,res, next))
    .all((req, res, next) => acessoRotaMiddleware.acessoRota(req, res, next))
    .all((req, res, next) => orcamentoMiddleware.orcamentoExiste(req, res, next))
    .all((req, res, next) => orcamentoMiddleware.podeCriarDespesa(req, res, next))
    .post((req, res) => orcamentoController.salvaDespesaExtra(req, res));

    router.route('/despesaExtra/:id')
    .all((req, res, next) => loginMiddleware.validaToken(req,res, next))
    .all((req, res, next) => acessoRotaMiddleware.acessoRota(req, res, next))
    .all((req, res, next) => orcamentoMiddleware.despesaExtraExiste(req, res, next))
    .all((req, res, next) => orcamentoMiddleware.orcamentoExiste(req, res, next))
    .all((req, res, next) => orcamentoMiddleware.podeCriarDespesa(req, res, next))
    .put((req, res) => orcamentoController.atualizaDespesaExtra(req, res))
    .delete((req, res) => orcamentoController.deletaDespesaExtra(req, res));

    router.route('/:roteiroId/:versaoRoteiro?')
    .all((req, res, next) => loginMiddleware.validaToken(req,res, next))
    .all((req, res, next) => acessoRotaMiddleware.acessoRota(req, res, next))
    .all((req, res, next) => orcamentoMiddleware.roteiroExiste(req, res, next))
    .get((req, res) => orcamentoController.mostra(req, res))
    .put((req, res) => orcamentoController.atualiza(req, res));

  return router;
}