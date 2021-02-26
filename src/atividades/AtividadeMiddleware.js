export default class AtividadeMiddleware{
  
    constructor(atividadeRepository){
      this.atividadeRepository = atividadeRepository;
    }
  
    async atividadeExiste(req, res, next){
      const atividade = await this.atividadeRepository.buscaPorId(req.params.id)
      if(!atividade){
        return res.status(404).json({status: '403', mensagem: 'Atividade não encontrada.'});       
      }
      req.atividade = atividade;
      next(); 
    }
  }