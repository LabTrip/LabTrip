const jwt = require('jsonwebtoken');

export default class LoginMiddleware{
  
    constructor(usuarioRepository){
      this.usuarioRepository = usuarioRepository;
    }
  
    async usuarioExiste(req, res, next){
      try{
        console.log(re.body.email)
        const usuario = await this.usuarioRepository.buscaPorEmail(req.body.email);
        if(!usuario){
          return res.status(401).json({erro: 'E-mail e/ou senha inválidos.'});       
        }
        req.usuario = usuario;
        next();
      }
      catch(e){
        return res.status(400).json({status: '400', mensagem: 'Entrada de informações incorretas.'});
      }
       
    }

    async validaToken(req, res, next){
      const token = req.headers['x-access-token'];
      jwt.verify(token, process.env.SECRET, (err, decoded) => {
          if(err){
            return res.status(401).json({status:"401",message:"Token inválido ou faltando."});
          }  
          req.token = decoded;
          next();
      });
  
    }

  }