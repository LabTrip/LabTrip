export default class AcessoRotaMiddleware{
  
    constructor(acessoRotaRepository){
      this.acessoRotaRepository = acessoRotaRepository;
    }

    async acessoRota(req, res, next){
      const requisitante = 
      {
        perfilId: req.token.perfilId,
        endpoint: req.baseUrl + req.route.path,
        metodo: req.method
      }

      if((requisitante.perfilId == 2 || requisitante.perfilId == 3) && (req.token.agenciaId == null || req.token.agenciaId == undefined)){
        return res.status(403).json({status: '403', mensagem: 'Sem permissão de acesso: usuário de funcionário sem agência atrelada.'});
      }

      const acesso = await this.acessoRotaRepository.buscaAcesso(requisitante)
      
      if(!acesso){
        return res.status(403).json({status: '403', mensagem: 'Sem permissão de acesso.'});       
      }
      req.acesso = acesso;
      next(); 
    }


    async verificaAgenciaAtrelada(){

    }
  }