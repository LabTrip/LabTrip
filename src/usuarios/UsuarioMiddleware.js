export default class UsuarioMiddleware{
  
    constructor(usuarioRepository){
      this.usuarioRepository = usuarioRepository;
    }
  
    async usuarioExiste(req, res, next){
      const identificador = req.params.id;
      let usuario = undefined;
      if(identificador.includes('@')){
        usuario = await this.usuarioRepository.buscaPorEmail(req.params.id)
      }
      else{
        usuario = await this.usuarioRepository.buscaPorId(req.params.id)
      }
      
      if(!usuario){
        return res.status(403).json({status: '403', mensagem: 'Usuário não encontrado ou sem permissão de acesso.'});
      }
      req.usuario = usuario;
      next(); 
    }
  }