export default class RoteiroMiddleware{
  
    constructor(roteiroRepository){
      this.roteiroRepository = roteiroRepository;
    }
  
    async roteiroExiste(req, res, next){   
      const roteiro = await this.verificaAcessoRoteiro(req)
      if(!roteiro){
        return res.status(404).json({status: '403', mensagem: 'Roteiro não encontrado.'});       
      }
      req.roteiro = roteiro;
      next(); 
    }

    async verificaAcessoRoteiro(req){
      if(req.acesso.tipoAcesso== "Total" || req.acesso.tipoAcesso== "Gerencial"|| req.acesso.tipoAcesso== "Parcial"){
        return await this.roteiroRepository.buscaPorId(req);
      }else{
        return undefined;
      }
    } 

    
}