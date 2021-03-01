export default class RoteiroAtividadeMiddleware{
  
    constructor(roteiroAtividadeRepository){
      this.roteiroAtividadeRepository = roteiroAtividadeRepository;
    }
  
    async roteiroAtividadeExiste(req, res, next){   
      const roteiroAtividade = await this.verificaAcesso(req)
       if(!roteiroAtividade){
        return res.status(404).json({status: '403', mensagem: 'Atividade do Roteiro não encontrada.'});       
      }
      req.roteiroAtividade = roteiroAtividade;
      next(); 
    }

    async verificaAcesso(req){

      if(req.acesso.endpoint =='/roteiroAtividades/'){
        console.log(req.acesso.endpoint)
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

      if(req.acesso.endpoint =='/roteiroAtividades/:atividadeId/:roteiroId/:versaoRoteiro'){
        switch(req.acesso.tipoAcesso){          
          case 'Total': 
            return await this.roteiroRepository.buscaPorId(req.params.atividadeId, req.params.roteiroId,req.params.versaoRoteiro);
            break;
          case 'Gerencial':
              return await this.roteiroRepository.buscaPorId_AcessoGerencial(req.params.atividadeId, req.params.roteiroId,req.params.versaoRoteiro, req.token.agenciaId);
            break;
          case 'Parcial':
            return await this.roteiroRepository.buscaPorId_AcessoParcial(req.params.atividadeId, req.params.roteiroId,req.params.versaoRoteiro,req.token.id);
            break;
          default:
            return undefined;
        }
      }

      if(req.acesso.endpoint =='/roteiros/:viagemId/:versao'){ 
        switch(req.acesso.tipoAcesso){
          case 'TOTAL': 
            return await this.roteiroRepository.buscaPorId(req.params.viagemId, req.params.versao);
            break;
          case 'Gerencial':
              return await this.roteiroRepository.buscaPorId_AcessoGerencial(req.params.id, req.token.agenciaId);
            break;
          case 'Parcial':
            return await this.roteiroRepository.buscaPorId_AcessoParcial(req.params.id,req.token.id);
            break;
          default:
            return undefined;
        }
      }      
      
      

    }
}