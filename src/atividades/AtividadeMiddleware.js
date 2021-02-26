export default class AtividadeMiddleware{
  
    constructor(atividadeRepository){
      this.atividadeRepository = atividadeRepository;
    }
  
    async atividadeExiste(req, res, next){
      const atividade = await this.verificaAcessoAAtividade(req)
      if(!atividade){
        return res.status(403).json({status: '403', mensagem: 'Atividade não encontrada ou sem permissão de acesso.'});       
      }
      req.atividade = atividade;
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

    async verificaAcessoAAtividade(req){

      switch(req.acesso.tipoAcesso){
        case 'Total':
          return await this.atividadeRepository.buscaPorId(req.params.id)
          break;
        case 'Gerencial':
          return await this.atividadeRepository.buscaPorId_AcessoParcial(req.params.id, req.token.agenciaId)
          break;
        case 'Parcial':
          return await this.atividadeRepository.buscaPorId_AcessoParcial(req.params.id, req.token.agenciaId)
          break;
        default:
          return undefined;
      }

    }
  }