require('dotenv/config');
import LabTrip from './app';
const escomplex = require('escomplex');

const result = escomplex.analyse(
        [{path:'./server.js', code:'js'},
        {path:'./config.js', code:'js'},
        {path: './app.js', code:'js'},
        {path: './viagens/Viagem.js', code:'js'},
        {path: './viagens/ViagemController.js', code:'nodeJS'},
        {path: './viagens/ViagemMiddlware.js', code:'js'},
        {path: './viagens/ViagemRepository.js', code:'js'},
        {path: './viagens/ViagemRouter.js', code:'js'},
        {path: './usuarios/Usuario.js', code:'js'},
        {path: './usuarios/UsuarioController.js', code:'js'},
        {path: './usuarios/UsuarioMiddlware.js', code:'js'},
        {path: './usuarios/UsuarioRepository.js', code:'js'},
        {path: './usuarios/UsuarioRouter.js', code:'js'},
        {path: './status/StatusMiddlware.js', code:'js'},
        {path: './usuarios/StatusRepository.js', code:'js'},
        {path: './perfis/Perfil.js', code:'js'},
        {path: './perfis/PerfilController.js', code:'js'},
        {path: './perfis/PerfilMiddlware.js', code:'js'},
        {path: './perfis/PerfilRepository.js', code:'js'},
        {path: './perfis/PerfilRouter.js', code:'js'},
        {path: './login/Login.js', code:'js'},
        {path: './login/LoginController.js', code:'js'},
        {path: './login/LoginMiddlware.js', code:'js'},
        {path: './login/LoginRepository.js', code:'js'},
        {path: './login/LoginRouter.js', code:'js'},
        {path: './agencias/Agencia.js', code:'js'},
        {path: './agencias/AgenciaController.js', code:'js'},
        {path: './agencias/AgenciaMiddlware.js', code:'js'},
        {path: './agencias/AgenciaRepository.js', code:'js'},
        {path:'./agencias/AgenciaRouter.js', code:'js'},
        ],{ignoreErros: false});

console.log(result)

const app = LabTrip();

app.listen(process.env.PORT || 5001, function(){
        console.log('Hello!');
});