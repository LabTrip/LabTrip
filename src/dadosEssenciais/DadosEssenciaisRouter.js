import express from 'express';
import LoginMiddleware from '../login/LoginMiddleware'
import LoginRepository from '../login/LoginRepository'
import AcessoRotaMiddleware from '../acesso_rota/AcessoRotaMiddleware'
import AcessoRotaRepository from '../acesso_rota/AcessoRotaRepository'
import DadosEssenciaisController from './DadosEssenciaisController'
import DadosEssenciaisRepository from './DadosEssenciaisRepository'
import DadosEssenciaisMiddleware from './DadosEssenciaisMiddleware'
import RoteiroAtividadeMiddleware from '../roteiroAtividades/RoteiroAtividadeMiddleware'
import RoteiroAtividadeRepository from '../roteiroAtividades/RoteiroAtividadeRepository'
import {client} from '../config'
const multer = require("multer");
const multerConfig = require("../config/multer");

export default function defineDadosEssenciaisRouter(){
  const router = express.Router();

  const loginRepository = new LoginRepository(client);
  const loginMiddleware = new LoginMiddleware(loginRepository);

  const acessoRotaRepository = new AcessoRotaRepository(client)
  const acessoRotaMiddleware = new AcessoRotaMiddleware(acessoRotaRepository)

  const roteiroAtividadeRepository = new RoteiroAtividadeRepository(client);
  const roteiroAtividadeMiddleware = new RoteiroAtividadeMiddleware(roteiroAtividadeRepository);

  
  const dadosEssenciaisRepository = new DadosEssenciaisRepository(client);
  const dadosEssenciaisController = new DadosEssenciaisController(dadosEssenciaisRepository);
  const dadosEssenciaisMiddleware = new DadosEssenciaisMiddleware(dadosEssenciaisRepository)


  router.route('/')
   .all((req, res, next) => loginMiddleware.validaToken(req,res, next))
   .all((req, res, next) => acessoRotaMiddleware.acessoRota(req, res, next))
   .get((req, res) => dadosEssenciaisController.buscaTodos(req, res))
   .post((req, res) => dadosEssenciaisController.salva(req, res));

  router.route('/:dadosEssenciaisId')
    .all((req, res, next) => loginMiddleware.validaToken(req,res, next))
    .all((req, res, next) => acessoRotaMiddleware.acessoRota(req, res, next))
    .all((req, res, next) => dadosEssenciaisMiddleware.dadosEssenciaisExiste(req, res, next))    
    .get((req, res) => dadosEssenciaisController.mostra(req, res))
    .put((req, res) => dadosEssenciaisController.atualiza(req, res))
    .delete((req, res) => dadosEssenciaisController.deleta(req, res));

  
  router.route('/arquivoDadosEssenciais/:dadosEssenciaisId')
    .all((req, res, next) => loginMiddleware.validaToken(req,res, next))
    .all((req, res, next) => acessoRotaMiddleware.acessoRota(req, res, next))
    .all((req, res, next) => dadosEssenciaisMiddleware.dadosEssenciaisExiste(req, res, next))  
    .get((req, res) => dadosEssenciaisController.mostraArquivoRoteiroAtividade(req, res))
    .put(multer(multerConfig).single("file"), (req, res) => dadosEssenciaisController.atualizaArquivoRoteiroAtividade(req, res))
    .delete((req, res) => dadosEssenciaisController.deletaArquivoRoteiroAtividade(req, res));  
   
   router.route('/roteiroAtividade/:roteiroAtividadeId') 
   .all((req, res, next) => loginMiddleware.validaToken(req,res, next))
   .all((req, res, next) => acessoRotaMiddleware.acessoRota(req, res, next))
   .all((req, res, next) => roteiroAtividadeMiddleware.roteiroAtividadeExiste(req, res, next))  
   .get((req, res) => dadosEssenciaisController.buscaPorRoteiroAtividadeId(req, res))  



  return router;
}