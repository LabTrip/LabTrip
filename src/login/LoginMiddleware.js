export default class UsuarioMiddleware{
  
    constructor(usuarioRepository){
      this.usuarioRepository = usuarioRepository;
    }
  
    async usuarioExiste(req, res, next){
      //const usuario = this.usuarios.find(u => u.id == req.params.id);
      const usuario = await this.usuarioRepository.buscaPorEmail(req.body.email);
      if(!usuario){
        return res.status(404).json({erro: 'E-mail não cadastrado.'});       
      }
      console.log("E-mail localizado na base de dados")
      req.usuario = usuario;
      next(); 
    }
  }