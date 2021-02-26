export default class ViagemMiddleware{
  
    constructor(viagemRepository){
      this.viagemRepository = viagemRepository;
    }
  
    async viagemExiste(req, res, next){
      const viagem = await this.verificaAcesso(req)
      
      if(!viagem){
        return res.status(403).json({status: '403', mensagem: 'Viagem não encontrada ou sem permissão de acesso.'});       
      }
      req.viagem = viagem;
      next(); 
    }

    async verificaAcesso(req){
      
      switch(req.acesso.tipoAcesso){
        case 'Total':
          return await this.viagemRepository.buscaPorId(req.params.id);
          break;
        case 'Gerencial':
            return await this.viagemRepository.buscaPorIdGerencial(req.params.id, req.token.agenciaId);
          break;
        case 'Parcial':
          return await this.viagemRepository.buscaPorIdParcial(req.params.id,req.token.id);
          break;
        default:
          return undefined;
      }
    }

  }