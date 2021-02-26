

export default class LocalMiddleware{
  
    constructor(localRepository){
      this.localRepository = localRepository;
    }
  
    async localExiste(req, res, next){
      const local = await this.verificaAcessoAoLocal(req);
      if(!local){
        return res.status(403).json({status: '403', mensagem: 'Local não encontrado ou sem permissão de acesso..'});       
      }
      req.local = local;
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

    async verificaAcessoAoLocal(req){

      switch(req.acesso.tipoAcesso){
        case 'Total':
          return await this.localRepository.buscaPorId(req.params.id)
          break;
        default:
          return undefined;
      }

    }
  }