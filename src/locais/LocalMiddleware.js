export default class LocalMiddleware{
  
    constructor(localRepository){
      this.localRepository = localRepository;
    }
  
    async localExiste(req, res, next){
      const local = await this.localRepository.buscaPorId(req.params.id)
      if(!local){
        return res.status(404).json({erro: 'Local não encontrado.'});       
      }
      req.local = local;
      next(); 
    }
  }