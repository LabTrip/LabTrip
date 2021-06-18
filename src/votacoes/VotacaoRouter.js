import express from 'express';
import LoginMiddleware from '../login/LoginMiddleware'
import LoginRepository from '../login/LoginRepository'
import AcessoRotaMiddleware from '../acesso_rota/AcessoRotaMiddleware'
import AcessoRotaRepository from '../acesso_rota/AcessoRotaRepository'
import VotacaoController from './VotacaoController'
import VotacaoRepository from './VotacaoRepository'
import VotacaoMiddleware from './VotacaoMiddleware'
import RoteiroAtividadeMiddleware from '../roteiroAtividades/RoteiroAtividadeMiddleware'
import RoteiroAtividadeRepository from '../roteiroAtividades/RoteiroAtividadeRepository'
import {client} from '../config'

export default function defineVotacaoRouter(){
  const router = express.Router();

  const loginRepository = new LoginRepository(client);
  const loginMiddleware = new LoginMiddleware(loginRepository);

  const acessoRotaRepository = new AcessoRotaRepository(client)
  const acessoRotaMiddleware = new AcessoRotaMiddleware(acessoRotaRepository)

  const roteiroAtividadeRepository = new RoteiroAtividadeRepository(client);
  const roteiroAtividadeMiddleware = new RoteiroAtividadeMiddleware(roteiroAtividadeRepository);

  
  const votacaoRepository = new VotacaoRepository(client);
  const votacaoController = new VotacaoController(votacaoRepository);
  const votacaoMiddleware = new VotacaoMiddleware(votacaoRepository)


  router.route('/')
   .all((req, res, next) => loginMiddleware.validaToken(req,res, next))
   .all((req, res, next) => acessoRotaMiddleware.acessoRota(req, res, next))
   .get((req, res) => votacaoController.buscaTodos(req, res))
   .post((req, res) => votacaoController.salva(req, res));

  router.route('/:roteiroAtividadeId/:usuarioId')
    .all((req, res, next) => loginMiddleware.validaToken(req,res, next))
    .all((req, res, next) => acessoRotaMiddleware.acessoRota(req, res, next))
    .all((req, res, next) => roteiroAtividadeMiddleware.roteiroAtividadeExiste(req, res, next))
    .all((req, res, next) => votacaoMiddleware.votacaoExiste(req, res, next))    
    .get((req, res) => votacaoController.mostra(req, res))
    .put((req, res) => votacaoController.atualiza(req, res))
    .delete((req, res) => votacaoController.deleta(req, res));

  router.route('/:roteiroAtividadeId')  
    .all((req, res, next) => loginMiddleware.validaToken(req,res, next))
    .all((req, res, next) => acessoRotaMiddleware.acessoRota(req, res, next))
    .all((req, res, next) => roteiroAtividadeMiddleware.roteiroAtividadeExiste(req, res, next))  
    .get((req, res) => votacaoController.buscaTodosPorRoteiroAtividade(req, res))


  return router;
}