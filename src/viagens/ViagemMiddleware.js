export default class ViagemMiddleware{
  
    constructor(viagemRepository){
      this.viagemRepository = viagemRepository;
    }
  
    async viagemExiste(req, res, next){
      const viagem = await this.viagemRepository.buscaPorId(req.params.id)
      if(!viagem){
        return res.status(404).json({erro: 'Viagem não encontrada.'});       
      }
      req.viagem = viagem;
      next(); 
    }
  }