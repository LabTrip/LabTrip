export default class RoteiroMiddleware{
  
    constructor(roteiroRepository){
      this.roteiroRepository = roteiroRepository;
    }
  
    async roteiroExiste(req, res, next){   
      const roteiro = await this.verificaAcessoRoteiro(req)
      if(!roteiro){
        return res.status(403).json({status: '403', mensagem: 'Roteiro não encontrado ou sem permissão de acesso.'});       
      }
      req.roteiro = roteiro;
      next(); 
    }

    async verificaAprovacaoRoteiro(req, res, next){   
      const statusAprovado = await this.roteiroRepository.buscaStatusComFiltro({descricao: 'Aprovado'});
      
      if(req.route.path == '/versionar/:id/:versao' && req.roteiro.statusId == statusAprovado.id){
        return res.status(403).json({status: '403', mensagem: 'Não é permitido versionar um roteiro aprovado. Altere o status e versione novamente.'});       
      }

      const {statusId} = req.body;
      const roteiroAprovado = await this.roteiroRepository.buscaRoteiroAprovadoDaViagemId(req.roteiro.viagemId, 'Aprovado', req.roteiro.id, req.roteiro.versao);

      if(roteiroAprovado && statusAprovado.id == statusId){
        return res.status(403).json({status: '403', mensagem: 'Só pode existir um roteiro aprovado por viagem. Altere o status do roteiro já aprovado e tente novamente.'});       
      }
      
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