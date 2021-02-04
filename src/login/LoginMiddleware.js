const jwt = require('jsonwebtoken');

export default class UsuarioMiddleware{
  
    constructor(usuarioRepository){
      this.usuarioRepository = usuarioRepository;
    }
  
    async usuarioExiste(req, res, next){
      //const usuario = this.usuarios.find(u => u.id == req.params.id);
      const usuario = await this.usuarioRepository.buscaPorEmail(req.body.email);
      if(!usuario){
        return res.status(401).json({erro: 'E-mail e/ou senha inválidos.'});       
      }
      req.usuario = usuario;
      next(); 
    }

    async validaToken(req, res, next){
      const token = req.headers['x-access-token'];
      jwt.verify(token, process.env.SECRET, (err, decoded) => {
          if(err) return res.status(401).json({status:"401",message:"Token inválido ou faltando."});
  
          req.email = decoded.email;
          req.id = decoded.id;
          req.perfilId = decoded.perfilId;
          req.geradoEm = decoded.geradoEm;
          next();
      });
  
    }

  }