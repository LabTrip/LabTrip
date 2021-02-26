export default class PerfilMiddleware{
  
    constructor(perfilRepository){
      this.perfilRepository = perfilRepository;
    }
  
    async perfilExiste(req, res, next){
      const perfil = await this.verificaAcessoAoPerfil(req);
      if(!perfil){
        return res.status(404).json({status: '403', mensagem: 'Perfil não encontrado ou sem permissão de acesso.'});       
      }
      req.perfil = perfil;
      next(); 
    }

    async verificaAcesso(req, res, next){

      switch(req.acesso.tipoAcesso){
        case 'Total':
          next();
          break;
        case 'Gerencial':
          next();
          break;
        case 'Parcial':
          next();
          break;
        default:
          return res.status(403).json({status: '403', mensagem: 'Sem permissão de acesso.'});
      }

    }

    async verificaAcessoAoPerfil(req){

      switch(req.acesso.tipoAcesso){
        case 'Total':
          return await this.perfilRepository.buscaPorId(req.params.id)
          break;
        default:
          return undefined;
      }

    }
  }