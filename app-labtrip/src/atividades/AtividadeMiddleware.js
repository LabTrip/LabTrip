export default class AtividadeMiddleware{
  
    constructor(atividadeRepository){
      this.atividadeRepository = atividadeRepository;
    }
  
    async atividadeExiste(req, res, next){
      const atividade = await this.atividadeRepository.getById(req.params.atividadeId)
      if(!atividade){
        return res.status(404).json({erro: 'Atividade não encontrada!'});       
      }
      req.atividade = atividade;
      next(); 
    }
  }