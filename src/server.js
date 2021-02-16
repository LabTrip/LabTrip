require('dotenv/config');
import LabTrip from './app';
const escomplex = require('escomplex');

const result = escomplex.analyse(
        [{path:'./server.js', code:'Node.js'},
        {path:'./config.js', code:'Node.js'},
        {path: './app.js', code:'Node.js'},
        {path: './viagens/Viagem.js', code:'Node.js'},
        {path: './viagens/ViagemController.js', code:'Node.js'},
        {path: './viagens/ViagemMiddleware.js', code:'Node.js'},
        {path: './viagens/ViagemRepository.js', code:'Node.js'},
        {path: './viagens/ViagemRouter.js', code:'Node.js'},
        {path: './usuarios/Usuario.js', code:'Node.js'},
        {path: './usuarios/UsuarioController.js', code:'Node.js'},
        {path: './usuarios/UsuarioMiddleware.js', code:'Node.js'},
        {path: './usuarios/UsuarioRepository.js', code:'Node.js'},
        {path: './usuarios/UsuarioRouter.js', code:'Node.js'},
        {path: './status/StatusMiddleware.js', code:'Node.js'},
        {path: './usuarios/StatusRepository.js', code:'Node.js'},
        {path: './perfis/Perfil.js', code:'Node.js'},
        {path: './perfis/PerfilController.js', code:'Node.js'},
        {path: './perfis/PerfilMiddleware.js', code:'Node.js'},
        {path: './perfis/PerfilRepository.js', code:'Node.js'},
        {path: './perfis/PerfilRouter.js', code:'Node.js'},
        {path: './login/Login.js', code:'Node.js'},
        {path: './login/LoginController.js', code:'Node.js'},
        {path: './login/LoginMiddleware.js', code:'Node.js'},
        {path: './login/LoginRepository.js', code:'Node.js'},
        {path: './login/LoginRouter.js', code:'Node.js'},
        {path: './agencias/Agencia.js', code:'Node.js'},
        {path: './agencias/AgenciaController.js', code:'Node.js'},
        {path: './agencias/AgenciaMiddleware.js', code:'Node.js'},
        {path: './agencias/AgenciaRepository.js', code:'Node.js'},
        {path:'./agencias/AgenciaRouter.js', code:'Node.js'},
        ],{ignoreErros: false});

console.log(result)

const app = LabTrip();

app.listen(process.env.PORT || 5001, function(){
        console.log('Hello!');
});