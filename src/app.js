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
var helmet = require('helmet');

export default function LabTrip() {
  const app = express();
  app.use(express.json());
  app.use((req, res, next) => { //Cria um middleware onde todas as requests passam por ele
    console.log(req.secure)//Redireciona a requisição para o mesmo host e url mas com HTTPS e termina a request
});
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

  app.get('/', function(req, res) {
    res.status(200).send('Olá  mundo!');
  });

  return app;
}