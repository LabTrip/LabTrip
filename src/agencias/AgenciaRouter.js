import express from 'express';
import AgenciaController from './AgenciaController'
import AgenciaMiddleware from './AgenciaMiddleware'
import AgenciaRepository from './AgenciaRepository'
import LoginMiddleware from '../login/LoginMiddleware'
import LoginRepository from '../login/LoginRepository'
import AcessoRotaMiddleware from '../acesso_rota/AcessoRotaMiddleware'
import AcessoRotaRepository from '../acesso_rota/AcessoRotaRepository'
import {client} from '../config'

export default function defineAgenciaRouter(){
  const router = express.Router();

  const agenciaRepository = new AgenciaRepository(client);

  const agenciaController = new AgenciaController(agenciaRepository);
  const agenciaMiddleware = new AgenciaMiddleware(agenciaRepository);

  const loginRepository = new LoginRepository(client);
  const loginMiddleware = new LoginMiddleware(loginRepository);

  const acessoRotaRepository = new AcessoRotaRepository(client)
  const acessoRotaMiddleware = new AcessoRotaMiddleware(acessoRotaRepository)

  router.route('/')
   .all((req, res, next) => loginMiddleware.validaToken(req,res, next))
   .all((req, res, next) => acessoRotaMiddleware.acessoRota(req, res, next))
   .all((req, res, next) => agenciaMiddleware.verificaAcesso(req, res, next))
   .get((req, res) => agenciaController.buscaTodos(req, res))
   .post((req, res) => agenciaController.salva(req, res));

  router.route('/convida-funcionarios')
    .all((req, res, next) => loginMiddleware.validaToken(req,res, next))
    .all((req, res, next) => acessoRotaMiddleware.acessoRota(req, res, next))
    .all((req, res, next) => agenciaMiddleware.agenciaExiste(req, res, next))
    .post((req, res) => agenciaController.enviaConviteFuncionario(req,res))

  router.route('/convida-funcionarios/:convite')
    .get((req, res) => agenciaController.aceitaConviteFuncionario(req,res))

  router.route('/funcionarios')
    .all((req, res, next) => loginMiddleware.validaToken(req,res, next))
    .all((req, res, next) => acessoRotaMiddleware.acessoRota(req, res, next))
    .all((req, res, next) => agenciaMiddleware.agenciaExiste(req, res, next))
    .delete((req, res) => agenciaController.deletaFuncionariosAgencia_AcessoTotal(req, res))

  router.route('/funcionarios/:id')
    .all((req, res, next) => loginMiddleware.validaToken(req,res, next))
    .all((req, res, next) => acessoRotaMiddleware.acessoRota(req, res, next))
    .all((req, res, next) => agenciaMiddleware.agenciaExiste(req, res, next))
    .get((req, res) => agenciaController.buscaFuncionarios(req, res))
    .delete((req, res) => agenciaController.deletaFuncionariosAgencia(req, res))

  router.route('/:id')
    .all((req, res, next) => loginMiddleware.validaToken(req,res, next))
    .all((req, res, next) => acessoRotaMiddleware.acessoRota(req, res, next))
    .all((req, res, next) => agenciaMiddleware.agenciaExiste(req, res, next))
    .get((req, res) => agenciaController.mostra(req, res))
    .put((req, res) => agenciaController.atualiza(req, res))
    .delete((req, res) => agenciaController.deleta(req, res));

  return router;
}