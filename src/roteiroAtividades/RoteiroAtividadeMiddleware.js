export default class RoteiroAtividadeMiddleware{
  
    constructor(roteiroAtividadeRepository){
      this.roteiroAtividadeRepository = roteiroAtividadeRepository;
    }
  
    async roteiroAtividadeExiste(req, res, next){   
      const roteiroAtividade = await this.verificaAcessoRoteiroAtividade(req)
       if(!roteiroAtividade){
        return res.status(404).json({status: '403', mensagem: 'Atividade do Roteiro não encontrada.'});       
      }
      req.roteiroAtividade = roteiroAtividade;
      next(); 
    }

    async verificaAcesso(req, res, next){
      if(req.acesso.tipoAcesso== "Total" || req.acesso.tipoAcesso== "Gerencial"|| req.acesso.tipoAcesso== "Parcial"){
        next();
      }else{
        return res.status(403).json({status: '403', mensagem: 'Sem permissão de acesso.'}); 
      }
    }

    async verificaAcessoRoteiroAtividade(req){
      if(req.acesso.tipoAcesso== "Total" || req.acesso.tipoAcesso== "Gerencial"|| req.acesso.tipoAcesso== "Parcial"){
        return await this.roteiroAtividadeRepository.buscaPorId(req);
      }else{
        return undefined;
      }
    }

}