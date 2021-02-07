export default class UsuarioMiddleware{
  
    constructor(usuarioRepository){
      this.usuarioRepository = usuarioRepository;
    }
  
    async usuarioExiste(req, res, next){
      //const usuario = this.usuarios.find(u => u.id == req.params.id);
      const usuario = await this.usuarioRepository.buscaPorId(req.params.id)
      if(!usuario){
        return res.status(404).json({erro: 'Usuário não encontrado.'});       
      }
      req.usuario = usuario;
      next(); 
    }
  }