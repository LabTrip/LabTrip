import express from 'express';
import cors from 'cors';
import defineUsuarioRouter from './usuarios/UsuarioRouter'
import defineViagemRouter from './viagens/ViagemRouter'
import defineAtividadeRouter from './atividades/AtividadeRouter'
import defineAgenciaRouter from './agencias/AgenciaRouter'
import defineLoginRouter from './login/LoginRouter'
import definePerfilRouter from './perfis/PerfilRouter'
import defineLocalRouter from './locais/LocalRouter'
import defineRoteiroRouter from './roteiros/RoteiroRouter'
import defineRoteiroAtividadeRouter from './roteiroAtividades/RoteiroAtividadeRouter'
import defineVotacaoRouter from './votacoes/VotacaoRouter'
import defineDadosEssenciaisRouter from './dadosEssenciais/DadosEssenciaisRouter'
import defineListaContatosRouter from './listaContatos/ListaContatosRouter'
import defineOrcamentoRouter from './orcamentos/OrcamentoRouter'
import definePublicRouter from './public/PublicRouter'
import defineNotificacaoRouter from './notificacoes/NotificacaoRouter'


const path = require("path");
var helmet = require('helmet');
var httpsRedirect = require('express-https-redirect');

export default function LabTrip() {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/', httpsRedirect());
  app.use(helmet());
  app.use(cors());
  app.use('/usuarios', defineUsuarioRouter());
  app.use('/viagens', defineViagemRouter());
  app.use('/atividades', defineAtividadeRouter());
  app.use('/agencias', defineAgenciaRouter());
  app.use('/login', defineLoginRouter());
  app.use('/perfis', definePerfilRouter());
  app.use('/locais', defineLocalRouter());
  app.use('/roteiros', defineRoteiroRouter());
  app.use('/roteiroAtividades', defineRoteiroAtividadeRouter());
  app.use('/votacoes', defineVotacaoRouter());
  app.use('/dadosEssenciais', defineDadosEssenciaisRouter());
  app.use('/listaContatos', defineListaContatosRouter());
  app.use('/orcamentos', defineOrcamentoRouter());
  app.use('/public', definePublicRouter());
  app.use('/notificacoes', defineNotificacaoRouter());
  app.use(
    "/files",
    express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
  );

  app.get('/', function(req, res) {
    res.status(200).send('Olá  mundo!');
  });

  return app;
}