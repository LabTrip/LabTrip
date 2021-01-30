import Login from './Login'
const jwt = require('jsonwebtoken');

const loginViewModel = (login) => ({
  id: usuario.id,
  nome: usuario.nome,
  email: usuario.email,
  permissaoID: usuario.permissaoID
});

export default class LoginController {

  constructor(loginRepository) {
    this.loginRepository = loginRepository;
  }

  async authenticate(req, res){
    const{email, senha} = req.body;

    const usuario = await new Login(this.usuarioRepository.getByEmail(email));

    senha = sha256(senha).toString();

    if(usuario.senha == senha){
      const token = jwt.sign(usuario.email, process.env.SECRET);
    }

    return res.status(200).json(usuarioViewModel(req.usuario), token); 
  }

}