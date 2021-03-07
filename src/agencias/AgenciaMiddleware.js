export default class AgenciaMiddleware{
  
    constructor(agenciaRepository){
      this.agenciaRepository = agenciaRepository;
    }
  
    async agenciaExiste(req, res, next){
      const agencia = await this.verificaAcessoAAgencia(req);
      if(!agencia){
        return res.status(403).json({status: '403', mensagem: 'Agencia não encontrada ou sem permissão de acesso.'});       
      }
      req.agencia = agencia;
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

    async verificaAcessoAAgencia(req){

      switch(req.acesso.tipoAcesso){
        case 'Total':
          return await this.agenciaRepository.buscaPorId(req.params.id)
          break;
        case 'Gerencial':
          return await this.agenciaRepository.buscaPorId_AcessoParcial(req.params.id, req.token.agenciaId)
          break;
        case 'Parcial':
          return await this.agenciaRepository.buscaPorId_AcessoParcial(req.params.id, req.token.agenciaId)
          break;
        default:
          return undefined;
      }

    }
  }