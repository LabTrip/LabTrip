export default class RoteiroMiddleware{
  
    constructor(roteiroRepository){
      this.roteiroRepository = roteiroRepository;
    }
  
    async roteiroExiste(req, res, next){
      const roteiro = await this.roteiroRepository.buscaPorId(req.params.Id)
      if(!roteiro){
        return res.status(404).json({status: '403', mensagem: 'Roteiro não encontrado.'});       
      }
      req.roteiro = roteiro;
      next(); 
    }
  }