import Login from './Login'
const jwt = require('jsonwebtoken');
import sha256 from 'crypto-js/sha256'

const loginViewModel = (usuario) => ({
  id: usuario.id,
  nome: usuario.nome,
  email: usuario.email,
  foto: usuario.foto,
  telefone: usuario.telefone,
  perfilId: usuario.perfilId,
  token: usuario.token,
});

export default class LoginController {

  constructor(loginRepository) {
    this.loginRepository = loginRepository;
  }

  async autentica(req, res){
    const{email, senha} = req.body;
    
    const usuario = await this.loginRepository.buscaPorEmail(email);
    
    if(usuario.senha == sha256(senha).toString()){
      console.log("verificou senha")
      const token = jwt.sign(usuario.email, process.env.SECRET);
      const usuarioAuth = new Login(usuario.id, usuario.nome, usuario.email, usuario.foto, usuario.telefone, usuario.perfilId, token)
      return res.status(200).json(loginViewModel(usuarioAuth)); 
    }
    else{
      console.log("recusou senha")
      return res.status(401).end();
    }
    
  }

  validaToken(req, res){

  }

}