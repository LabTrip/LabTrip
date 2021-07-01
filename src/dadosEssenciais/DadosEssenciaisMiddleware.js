export default class DadosEssenciaisMiddleware{
  
    constructor(dadosEssenciaisRepository){
      this.dadosEssenciaisRepository = dadosEssenciaisRepository;
    }
  
    async dadosEssenciaisExiste(req, res, next){   
      const dadosEssenciais = await this.verificaAcessoDadosEssenciais(req)
       if(!dadosEssenciais){
        return res.status(404).json({status: '403', mensagem: 'Arquivo não encontrado.'});       
      }
      req.dadosEssenciais = dadosEssenciais;
      next(); 
    }

    async verificaAcesso(req, res, next){
      if(req.acesso.tipoAcesso== "Total" || req.acesso.tipoAcesso== "Gerencial"|| req.acesso.tipoAcesso== "Parcial"){
        next();
      }else{
        return res.status(403).json({status: '403', mensagem: 'Sem permissão de acesso.'}); 
      }
    }

    async verificaAcessoDadosEssenciais(req){
      console.log("porID")
      if(req.acesso.tipoAcesso== "Total" || req.acesso.tipoAcesso== "Gerencial"|| req.acesso.tipoAcesso== "Parcial"){
        return await this.dadosEssenciaisRepository.buscaPorId(req);
      }else{
        return undefined;
      }
    }

}