export default class UsuarioMiddleware{
  
    constructor(usuarioRepository){
      this.usuarioRepository = usuarioRepository;
    }
  
    async usuarioExiste(req, res, next){
      const usuario = await this.usuarioRepository.buscaPorId(req.params.id)
      if(!usuario){
        return res.status(404).json({status: '403', mensagem: 'Usuário não encontrado.'});       
      }
      req.usuario = usuario;
      next(); 
    }
  }