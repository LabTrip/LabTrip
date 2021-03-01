export default class RoteiroMiddleware{
  
    constructor(roteiroRepository){
      this.roteiroRepository = roteiroRepository;
    }
  
    async roteiroExiste(req, res, next){   
      const roteiro = await this.verificaAcesso(req)
       if(!roteiro){
        return res.status(404).json({status: '403', mensagem: 'Roteiro não encontrado.'});       
      }
      req.roteiro = roteiro;
      next(); 
    }

    async verificaAcesso(req){

      if(req.acesso.endpoint =='/roteiros/'){
        switch(req.acesso.tipoAcesso){          
          case 'Total': 
            return await this.roteiroRepository.buscaTodos();
            break;
          case 'Gerencial':
              return await this.roteiroRepository.buscaTodos_AcessoGerencial(req.token.agenciaId);
            break;
          case 'Parcial':
            return await this.roteiroRepository.buscaTodos_AcessoParcial(req.token.id);
            break;
          default:
            return undefined;
        }
      }

      if(req.acesso.endpoint =='/roteiros/:id/:versao'){
        switch(req.acesso.tipoAcesso){
          case 'TOTAL': 
            return await this.roteiroRepository.buscaPorId(req.params.id, req.params.versao);
            break;
          case 'Gerencial':
              return await this.roteiroRepository.buscaPorId_AcessoGerencial(req.params.id, req.params.versao, req.token.agenciaId);
            break;
          case 'Parcial':
            return await this.roteiroRepository.buscaPorId_AcessoParcial(req.params.id, req.params.versao,req.token.id);
            break;
          default:
            return undefined;
        }
      }   
      
      

    }
}