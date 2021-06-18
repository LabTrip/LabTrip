export default class VotacaoMiddleware{
  
    constructor(votacaoRepository){
      this.votacaoRepository = votacaoRepository;
    }
  
    async votacaoExiste(req, res, next){   
      const votacao = await this.verificaAcessoVotacao(req)
       if(!votacao){
        return res.status(404).json({status: '403', mensagem: 'Votação não encontrada.'});       
      }
      req.votacao = votacao;
      next(); 
    }

    async verificaAcesso(req, res, next){
      if(req.acesso.tipoAcesso== "Total" || req.acesso.tipoAcesso== "Gerencial"|| req.acesso.tipoAcesso== "Parcial"){
        next();
      }else{
        return res.status(403).json({status: '403', mensagem: 'Sem permissão de acesso.'}); 
      }
    }

    async verificaAcessoVotacao(req){
      if(req.acesso.tipoAcesso== "Total" || req.acesso.tipoAcesso== "Gerencial"|| req.acesso.tipoAcesso== "Parcial"){
        return await this.votacaoRepository.buscaPorId(req);
      }else{
        return undefined;
      }
    }

}